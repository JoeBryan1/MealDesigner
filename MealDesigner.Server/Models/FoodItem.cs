namespace MealDesigner.Server.Models;

public class FoodItem
{
    public int FoodItemId { get; set; }
    public required string Name { get; set; }
    public string? LatinName { get; set; }
    public string? Description { get; set; }
    public string? FoodGroup { get; set; }
    public string? FoodSubgroup { get; set; }
    public string? WikipediaId { get; set; }
}