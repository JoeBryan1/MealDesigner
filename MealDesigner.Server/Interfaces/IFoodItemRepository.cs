using MealDesigner.Server.Models;

namespace MealDesigner.Server.Interfaces;

public interface IFoodItemRepository
{
    Task Add(FoodItem foodItem);
    Task<FoodItem?> GetById(int foodItemId);
    Task<List<string?>> GetAllFoodGroups();
    Task<FoodItem?> Update(FoodItem foodItem);
    Task<bool> Delete(int foodItemId);
}