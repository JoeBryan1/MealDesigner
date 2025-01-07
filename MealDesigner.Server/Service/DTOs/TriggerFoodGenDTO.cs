using System.Text.Json.Serialization;
using MealDesigner.Server.Models;

namespace MealDesigner.Server.Service.DTOs;

public class TriggerFoodGenDto
{
    [JsonPropertyName("foodItems")]
    public required List<FoodItem> FoodItems { get; set; }
    
    [JsonPropertyName("cuisine")]
    public string? Cuisine { get; set; }
    
    [JsonPropertyName("regenerate")]
    public Regenerate? Regenerate { get; set; }
}

public class Regenerate
{
    [JsonPropertyName("regenerateRecipe")]
    public required bool RegenerateRecipe { get; set; }
    
    [JsonPropertyName("recipe")]
    public required string Recipe { get; set; }
}