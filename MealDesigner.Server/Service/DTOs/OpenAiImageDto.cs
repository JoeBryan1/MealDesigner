using System.Text.Json.Serialization;

namespace MealDesigner.Server.Service.DTOs;

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