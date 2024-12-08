using MealDesigner.Server.Models;
using MealDesigner.Server.Service.DTOs;

namespace MealDesigner.Server.Interfaces;

public interface IPromptService
{
    Task<PromptResponseDto> TriggerRecipeGen(List<FoodItem> foodItems);
}