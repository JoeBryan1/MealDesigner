using System.Text.Json.Serialization;
using MealDesigner.Server.Models;

namespace MealDesigner.Server.Controllers.DTOs;

public class TriggerFoodGenDTO
{
    [JsonPropertyName("foodItems")]
    public List<FoodItem> FoodItems { get; set; }
    
    [JsonPropertyName("cuisine")]
    public string? Cuisine { get; set; }
}