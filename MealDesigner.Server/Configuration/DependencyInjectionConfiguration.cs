
using MealDesigner.Server.Data;
using MealDesigner.Server.Interfaces;
using MealDesigner.Server.Repositories;
using MealDesigner.Server.Service;

namespace MealDesigner.Server.Configuration;

public static class DependencyInjectionConfig
{
    public static IServiceCollection ResolveDependencies(this IServiceCollection services)
    {
        services.AddScoped<CosmosDbContext>();

        services.AddScoped<IFoodItemService, FoodItemService>();

        services.AddScoped<IFoodItemRepository, FoodItemRepository>();

        services.AddScoped<IPromptService, PromptService>();

        return services;
    }
}
