using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.IdentityModel.Tokens;

namespace MealDesigner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase
    {
        private readonly IFoodItemService _foodItemService;

        public FoodItemController(IFoodItemService foodItemService)
        {
            _foodItemService = foodItemService;
        }

        [HttpGet("{foodItemId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int foodItemId)
        {
            var foodItem = await _foodItemService.GetById(foodItemId);

            if (foodItem == null) return NotFound();

            return Ok(foodItem);
        }
        
        [HttpGet("foodGroups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllFoodGroups()
        {
            var foodItemGroups = await _foodItemService.GetAllFoodGroups();

            if (foodItemGroups.IsNullOrEmpty()) return NotFound();

            return Ok(foodItemGroups);
        }
    }
}
