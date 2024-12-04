using MealDesigner.Server.Configuration;
using Microsoft.EntityFrameworkCore;
using MealDesigner.Server.Data;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:4280");
        });
});

builder.Services.AddDbContextFactory<CosmosDbContext>(optionsBuilder => 
    optionsBuilder
        .UseCosmos(
            connectionString: builder.Configuration.GetConnectionString("DefaultConnection"),
            databaseName: "MealDesigner",
            cosmosOptionsAction: options =>
            {
                options.ConnectionMode(Microsoft.Azure.Cosmos.ConnectionMode.Direct);
                options.MaxRequestsPerTcpConnection(16);
                options.MaxTcpConnectionsPerEndpoint(32);
            }
            ));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ResolveDependencies();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();
app.MapControllers();

app.Run();
