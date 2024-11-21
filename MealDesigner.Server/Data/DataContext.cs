using Microsoft.EntityFrameworkCore;
using MealDesigner.Server.Entities;

namespace MealDesigner.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<FoodItem> FoodItems { get; set; }
    public DbSet<FoodItemName> FoodItemNames { get; set; }
}