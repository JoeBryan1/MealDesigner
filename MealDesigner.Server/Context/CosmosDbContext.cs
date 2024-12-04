using Microsoft.EntityFrameworkCore;
using MealDesigner.Server.Models;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace MealDesigner.Server.Data;

public class CosmosDbContext : DbContext
{
    public CosmosDbContext(DbContextOptions<CosmosDbContext> options) : base(options) { }

    public DbSet<FoodItem> FoodItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultContainer("foodItems");

        modelBuilder.Entity<FoodItem>()
            .HasNoDiscriminator()
            .HasPartitionKey(x => x.FoodGroup)
            .HasKey(x => x.FoodItemId);
    }
}