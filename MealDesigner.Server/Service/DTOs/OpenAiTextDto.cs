using System.Text.Json.Serialization;

namespace MealDesigner.Server.Service.DTOs;

public class OpenAiTextRequestDto
{
    [JsonPropertyName("messages")]
    public required List<OpenAiRequestMessageDto> Messages { get; set; }
    
    [JsonPropertyName("model")]
    public required string Model { get; set; }
    
    [JsonPropertyName("response_format")]
    public OpenAiResponseFormat? ResponseFormat { get; set; }
}

public class OpenAiResponseFormat
{
    [JsonPropertyName("type")]
    public string? Type { get; set; }
    
    [JsonPropertyName("json_schema")]
    public required OpenAiJsonSchema JsonSchema { get; set; }

}

public class OpenAiJsonSchema
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("schema")]
    public OpenAiSchema? Schema { get; set; }
    
    [JsonPropertyName("strict")]
    public bool? Strict { get; set; }
}

public class OpenAiSchema
{
    [JsonPropertyName("type")]
    public string? Type { get; set; }
    
    [JsonPropertyName("properties")]
    public MealProperties? Properties { get; set; }
    
    [JsonPropertyName("additionalProperties")]
    public bool? AdditionalProperties { get; set; }
    
    [JsonPropertyName("required")]
    public List<string>? Required { get; set; }
}

public class OpenAiJsonProperty
{
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonPropertyName("type")]
    public string? Type { get; set; }
}

public class MealProperties
{
    [JsonPropertyName("recipeName")]
    public OpenAiJsonProperty RecipeName { get; set; }
    
    [JsonPropertyName("recipe")]
    public OpenAiJsonProperty Recipe { get; set; }
}

public class OpenAiRequestMessageDto
{
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    
    [JsonPropertyName("role")]
    public required string Role { get; set; }
}


public class OpenAiTextResponseDto
{
    [JsonPropertyName("choices")]
    public required List<OpenAiChoiceDto> Choices { get; set; }
}

public class OpenAiChoiceDto
{
    [JsonPropertyName("finish_reason")]
    public required string FinishReason { get; set; }
    
    [JsonPropertyName("index")]
    public required int Index { get; set; }
    
    [JsonPropertyName("message")]
    public required OpenAiResponseMessageDto Message { get; set; }
    
}

public class OpenAiResponseMessageDto
{
    [JsonPropertyName("content")]
    public string? Content { get; set; }
    
    [JsonPropertyName("refusal")]
    public string? Refusal { get; set; }
}

public class OpenAiJsonResponse
{
    [JsonPropertyName("recipeName")]
    public string? RecipeName { get; set; }
    
    [JsonPropertyName("recipe")]
    public string? Recipe { get; set; }
}

public class PromptResponseDto
{
    [JsonPropertyName("recipeProperties")]
    public OpenAiJsonResponse? RecipeProperties { get; set; }
    
    [JsonPropertyName("imgUrl")]
    public string? ImgUrl { get; set; }
}