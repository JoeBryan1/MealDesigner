using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;

namespace MealDesigner.Server.Service;

public class FoodItemService : IFoodItemService
{
    private readonly IFoodItemRepository _foodItemRepository;

    public FoodItemService(IFoodItemRepository foodItemRepository)
    {
        _foodItemRepository = foodItemRepository;
    }

    public async Task<FoodItem> Add(FoodItem foodItem)
    {
        await _foodItemRepository.Add(foodItem);
        return foodItem;
    }

    public async Task<List<string?>> GetAllFoodGroups()
    {
        var foodItemGroups = await _foodItemRepository.GetAllFoodGroups();
        return foodItemGroups;
    }

    public async Task<FoodItem?> GetById(int foodItemId)
    {
        var foodItem = await _foodItemRepository.GetById(foodItemId);
        return foodItem;
    }

    public async Task<FoodItem?> Update(FoodItem foodItem)
    {
        var result = await _foodItemRepository.Update(foodItem);
        return result;
    }

    public async Task<bool> Delete(int foodItemId)
    {
        var result = await _foodItemRepository.Delete(foodItemId);
        return result;
    }
}