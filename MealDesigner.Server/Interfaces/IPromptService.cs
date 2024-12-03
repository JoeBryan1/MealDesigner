namespace MealDesigner.Server.Interfaces;

public interface IPromptService
{
    Task<string> TriggerOpenAI(string prompt);
}