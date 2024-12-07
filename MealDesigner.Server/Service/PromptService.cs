﻿using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using MealDesigner.Server.Interfaces;

namespace MealDesigner.Server.Service;

public class PromptService : IPromptService
{
    public readonly IConfiguration _configuration;

    public PromptService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<string> TriggerOpenAiImageGen(string prompt)
    {
        var apiKey = _configuration["OpenAISettings:APIKey"];
        var baseUrl = _configuration["OpenAISettings:BaseUrl"];
        
        HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var request = new OpenAiImageRequestDto
        {
            Model="dall-e-3",
            Prompt = prompt
        };
        
        var json = JsonSerializer.Serialize(request);
        Console.WriteLine(json);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(baseUrl, content);
        var resJson = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode)
        {
            var errorResponse = JsonSerializer.Deserialize<OpenAiErrorResponseDto>(resJson);
            throw new Exception(errorResponse?.Error.Message);
        }
        var data = JsonSerializer.Deserialize<OpenAiImageResponseDto>(resJson);
        var responseText = data.OpenAiImageUrls.FirstOrDefault().Url;

        return responseText;
    }
}


public class OpenAiErrorResponseDto
{
    [JsonPropertyName("error")]
    public required OpenAiError Error { get; set; }
}
    
public class OpenAiError
{
    [JsonPropertyName("message")]
    public required string Message { get; set; }

    [JsonPropertyName("type")]
    public required string Type { get; set; }

    [JsonPropertyName("param")]
    public required string Param { get; set; }

    [JsonPropertyName("code")]
    public required string Code { get; set; }
}
    
public class OpenAiImageRequestDto
{
    [JsonPropertyName("prompt")]
    public required string Prompt { get; set; }
        
    [JsonPropertyName("model")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Model { get; set; }
    
    [JsonPropertyName("n")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? NumImages { get; set; }
    
    [JsonPropertyName("quality")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Quality { get; set; }
    
    [JsonPropertyName("response_format")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ResponseFormat { get; set; }
        
    [JsonPropertyName("size")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Size { get; set; }
        
    [JsonPropertyName("style")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Style { get; set; }
}
    
public class OpenAiImageResponseDto
{
    [JsonPropertyName("data")]
    public required List<OpenAiImageUrlsDto> OpenAiImageUrls  { get; set; }
}

public class OpenAiImageUrlsDto
{
    [JsonPropertyName("url")]
    public required string Url { get; set; }
}