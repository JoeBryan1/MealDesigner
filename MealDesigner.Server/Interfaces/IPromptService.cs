using MealDesigner.Server.Controllers.DTOs;
using MealDesigner.Server.Service.DTOs;

namespace MealDesigner.Server.Interfaces;

public interface IPromptService
{
    Task<PromptResponseDto> TriggerRecipeGen(TriggerFoodGenDTO request);
}