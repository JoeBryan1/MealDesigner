using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;

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

        [HttpPost(Name = "TriggerFoodImageGen")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> TriggerFoodItemImageGen(List<FoodItem> foodItems)
        {
            // Take list of food items and convert into a prompt for OpenAI

            var foodItemNames = new List<string>();

            foodItems.ForEach(foodItem => foodItemNames.Add(foodItem.Name));

            var prompt = "Create an image of a tasty, edible meal anyone can make with the following food items: " 
                         + string.Join(",", foodItemNames);

            var response = await _promptService.TriggerOpenAiImageGen(prompt);
            return Ok(response);
        }
    }
}