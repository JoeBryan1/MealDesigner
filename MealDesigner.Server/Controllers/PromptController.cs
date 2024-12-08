using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;
using MealDesigner.Server.Service.DTOs;

namespace MealDesigner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        private readonly IPromptService _promptService;

        public PromptController(IPromptService promptService)
        {
            _promptService = promptService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> TriggerFoodTextImageGen(List<FoodItem> foodItems)
        {
            var response = await _promptService.TriggerRecipeGen(foodItems);
            return Ok(response);
        }
    }
}