using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealDesigner.Server.Data;
using MealDesigner.Server.Entities;

namespace MealDesigner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase
    {
        private readonly DataContext _context;

        public FoodItemController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<FoodItem>>> GetAllFoodItems()
        {
            var foodItem = await _context.FoodItems.ToArrayAsync();
            
            return Ok(foodItem);
        }

        [HttpGet("names")]
        public async Task<ActionResult<List<FoodItemName>>> GetAllFoodItemNames()
        {
            var foodItemName = await _context.FoodItems.Select(o => new FoodItemName()
            {
                Id = o.Id,
                Name = o.Name,
                FoodGroup = o.FoodGroup
                
            }).ToListAsync();
            
            return Ok(foodItemName);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<FoodItem>>> GetFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
                return NotFound();
            
            return Ok(foodItem);
        }

        [HttpGet("groups")]
        public async Task<ActionResult<List<string>>> GetFoodItemGroups()
        {
            var foodItemGroups = await _context.FoodItems.Select(o => o.FoodGroup)
                .Distinct().ToListAsync();
            
            return Ok(foodItemGroups);
        }
    }
}
