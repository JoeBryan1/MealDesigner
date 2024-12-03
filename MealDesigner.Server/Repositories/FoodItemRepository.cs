using MealDesigner.Server.Data;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace MealDesigner.Server.Repositories;

public class FoodItemRepository : IFoodItemRepository
{

    private readonly CosmosDbContext _dbContext;

    public FoodItemRepository(CosmosDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task Add(FoodItem foodItem)
    {
        _dbContext.Add(foodItem);
        
        await _dbContext.SaveChangesAsync();
    }


    public async Task<FoodItem?> GetById(int foodItemId)
    {
        var foodItem = await _dbContext
            .FoodItems
            .FindAsync(foodItemId);
        
        return foodItem;
    }

    public async Task<List<string?>> GetAllFoodGroups()
    {
        var foodItems = await _dbContext
            .FoodItems
            .Select(o => o.FoodGroup)
            .Distinct()
            .ToListAsync();

        return foodItems;
    }
    
    public async Task<FoodItem?> Update(FoodItem foodItem)
    {
        var existingFoodItem = await _dbContext
            .FoodItems
            .FindAsync(foodItem.FoodItemId);
        
        if (existingFoodItem == null) return null;
        
        existingFoodItem.Name = foodItem.Name;
        existingFoodItem.LatinName = foodItem.LatinName;
        existingFoodItem.Description = foodItem.Description;
        existingFoodItem.FoodGroup = foodItem.FoodGroup;
        existingFoodItem.FoodSubgroup = foodItem.FoodSubgroup;
        existingFoodItem.WikipediaId = foodItem.WikipediaId;
        
        await _dbContext.SaveChangesAsync();

        return foodItem;
    }

    public async Task<bool> Delete(int foodItemId)
    {
        var foodItem = await _dbContext
            .FoodItems
            .FindAsync(foodItemId);
        
        if (foodItem == null) return false;
        
        _dbContext.Remove(foodItem);
        
        await _dbContext.SaveChangesAsync();
        
        return true;
    }
}