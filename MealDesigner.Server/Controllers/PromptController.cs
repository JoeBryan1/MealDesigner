using Microsoft.AspNetCore.Mvc;
using MealDesigner.Server.Service;

namespace MealDesigner.Server.Controllers;


[ApiController]
[Route("[controller]")]
public class PromptController : ControllerBase
{
    private readonly IPromptService _promptService;

    public PromptController(IPromptService promptService)
    {
        _promptService = promptService;
    }

    [HttpGet(Name = "TriggerOpenAI")]
    public async Task<IActionResult> TriggerOpenAI([FromQuery] string input)
    {
        var response = await _promptService.TriggerOpenAI(input);
        return Ok(response);
    }
}
