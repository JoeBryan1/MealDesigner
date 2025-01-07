using MealDesigner.Server.Service.DTOs;
using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Interfaces;

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
        public async Task<IActionResult> TriggerFoodGen(TriggerFoodGenDto request)
        {
            var response = await _promptService.TriggerRecipeGen(request);
            return Ok(response);
        }
    }
}