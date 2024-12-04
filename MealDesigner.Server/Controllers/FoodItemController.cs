using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Models;
using Microsoft.Azure.Cosmos.Linq;

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
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add(FoodItem foodItem)
        {
            var result = await _foodItemService.Add(foodItem);

            return Ok(result);
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

            if (foodItemGroups.Count == 0) return NotFound();

            return Ok(foodItemGroups);
        }

        [HttpGet("foodGroup/{foodGroup}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllByGroup(string foodGroup)
        {
            var foodItems = await _foodItemService.GetAllByGroup(foodGroup);
            
            if (foodItems.Count == 0) return NotFound();
            
            return Ok(foodItems);
        }
        
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(FoodItem foodItem)
        {
            var result = await _foodItemService.Update(foodItem);
            
            if (result == null) return BadRequest();
            
            return Ok(result);
        }
        
        
        [HttpDelete("{foodItemId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int foodItemId)
        {
            var result = await _foodItemService.Delete(foodItemId);

            if (!result) return BadRequest();

            return Ok();
        }

    }
}
