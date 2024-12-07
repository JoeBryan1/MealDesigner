namespace MealDesigner.Server.Interfaces;

public interface IPromptService
{
    Task<string> TriggerOpenAiImageGen(string prompt);
}