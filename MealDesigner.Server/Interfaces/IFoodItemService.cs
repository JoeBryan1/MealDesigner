﻿using MealDesigner.Server.Models;

namespace MealDesigner.Server.Interfaces;

public interface IFoodItemService
{
    Task<FoodItem> Add(FoodItem foodItem);
    Task<FoodItem?> GetById(int foodItemId);
    Task<List<string>> GetAllFoodGroups();
    Task<List<FoodItem>> GetAllByGroup(string foodGroup);

    Task<FoodItem?> Update(FoodItem foodItem);
    Task<bool> Delete(int foodItemId);
}