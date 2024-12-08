using System.Text.Json.Serialization;

namespace MealDesigner.Server.Service.DTOs;

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