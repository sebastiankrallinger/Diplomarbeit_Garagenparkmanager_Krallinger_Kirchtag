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
                    builder.Configuration["CosmosConfig:cointainerName"]));

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie("Cookies")
            .AddOpenIdConnect(options =>
            {
                options.Authority = "http://localhost:8080";
                options.RequireHttpsMetadata = false;
                options.ClientId = "garagenparkmanager-aspnet-client";
                options.ClientSecret = "QkFloTsOy1zOLjSwu9PsSYtJ8TiBZ1Yw";
                options.ResponseType = "code";
                options.SaveTokens = true;
            });

            var app = builder.Build();

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