using MealDesigner.Server.Service.DTOs;

namespace MealDesigner.Server.Interfaces;

public interface IPromptService
{
    Task<PromptResponseDto> TriggerRecipeGen(TriggerFoodGenDto request);
}