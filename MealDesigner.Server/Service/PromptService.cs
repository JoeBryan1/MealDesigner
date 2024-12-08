using System.Net.Http.Headers;
using System.Text;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;
using MealDesigner.Server.Service.DTOs;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace MealDesigner.Server.Service;

public class PromptService : IPromptService
{
    private readonly IConfiguration _configuration;

    public PromptService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<PromptResponseDto> TriggerRecipeGen(List<FoodItem> foodItems)
    {
        var foodItemNames = new List<string>();
            
        foodItems.ForEach(foodItem => foodItemNames.Add(foodItem.Name));
            
        var textPrompt = "Generate a recipe and a name for the recipe which must contain the following ingredients: " 
                         + string.Join(",", foodItemNames);
            
            
        var mealProperties = await TriggerOpenAiTextGen(textPrompt);
            
        var mealName = mealProperties.RecipeName;

        var imgPrompt = "Generate an image of " + mealName;

        var imgUrl = await TriggerOpenAiImageGen(imgPrompt);

        var response = new PromptResponseDto()
        {
            RecipeProperties = mealProperties,
            ImgUrl = imgUrl
        };

        return response;
    }
    
    private async Task<OpenAiJsonResponse> TriggerOpenAiTextGen(string prompt)
    {
        var baseUrl = _configuration["OpenAISettings:TextGenUrl"];

        var systemMessage = new OpenAiRequestMessageDto
        {
            Role = "system",
            Content = "You generate a recipe and a name and input them into the JSON"
        };

        var userMessage = new OpenAiRequestMessageDto
        {
            Role = "user",
            Content = prompt
        };

        var responseFormat = new OpenAiResponseFormat
        {
            Type = "json_schema",
            JsonSchema = new OpenAiJsonSchema
            {
                Name = "recipe_schema",
                Strict = true,
                Schema = new OpenAiSchema
                {
                    Type = "object",
                    Properties = new MealProperties
                    {
                        RecipeName = new OpenAiJsonProperty
                        {
                            Description = "This is the name of the recipe",
                            Type = "string",
                        },
                        Recipe = new OpenAiJsonProperty
                        {
                            Description = "This is the recipe",
                            Type = "string",
                        }
                    },
                    AdditionalProperties = false,
                    Required = ["recipeName", "recipe"]
                }
            }
        };
        
        Console.WriteLine(JsonSerializer.Serialize(responseFormat));
        
        var request = new OpenAiTextRequestDto
        {
            Messages = [systemMessage, userMessage],
            Model = "gpt-4o",
            ResponseFormat = responseFormat
        };
        
        var resJson = await SendOpenAiRequest(request, baseUrl);
        
        var data = JsonSerializer.Deserialize<OpenAiTextResponseDto>(resJson);
        
        var responseText = data.Choices.FirstOrDefault().Message.Content;
        
        var mealProperties = JsonSerializer.Deserialize<OpenAiJsonResponse>(responseText);

        return mealProperties;
    }

    private async Task<string> TriggerOpenAiImageGen(string prompt)
    {
        var baseUrl = _configuration["OpenAISettings:ImageGenUrl"];

        var request = new OpenAiImageRequestDto
        {
            Model="dall-e-3",
            Prompt = prompt
        };
        
        var resJson = await SendOpenAiRequest(request, baseUrl);
        
        var data = JsonSerializer.Deserialize<OpenAiImageResponseDto>(resJson);
        var responseText = data.OpenAiImageUrls.FirstOrDefault().Url;

        return responseText;
    }

    private async Task<string> SendOpenAiRequest(object request, string url)
    {
        var apiKey = _configuration["OpenAISettings:APIKey"];
        
        var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        
        var json = JsonSerializer.Serialize(request);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(url, content);
        var resJson = await response.Content.ReadAsStringAsync();
        
        if (!response.IsSuccessStatusCode)
        {
            var errorResponse = JsonSerializer.Deserialize<OpenAiErrorResponseDto>(resJson);
            throw new Exception(errorResponse?.Error.Message);
        }

        return resJson;
    }
}