using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace Garagenparkmanager.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<ICustomerRepository, CustomerRepository>(x
                => new CustomerRepository(
                    builder.Configuration.GetConnectionString("CosmosDb"),
                    builder.Configuration["CosmosConfig:primaryKey"],
                    builder.Configuration["CosmosConfig:databaseName"],
                    builder.Configuration["CosmosConfig:cointainerName"]
                )
            );

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("https://localhost:5173") 
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            app.UseCors("AllowFrontend");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}