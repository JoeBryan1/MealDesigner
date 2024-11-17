using Microsoft.EntityFrameworkCore;
using ReactASP.Server.Entities;

namespace ReactASP.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<FoodItem> FoodItems { get; set; }
    public DbSet<FoodItemName> FoodItemNames { get; set; }
}