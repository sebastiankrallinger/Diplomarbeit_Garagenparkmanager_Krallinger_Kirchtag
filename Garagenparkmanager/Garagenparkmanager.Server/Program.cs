using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Garagenparkmanager.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            string storageConnectionString = builder.Configuration["Azure:DocumentStorageConnectionString"];

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Description = "Enter your JWT Access Token",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                options.AddSecurityDefinition("Bearer", jwtSecurityScheme);
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtSecurityScheme, Array.Empty<string>() },
                });
            });

            builder.Services.AddScoped<IUserRepository, UserRepository>(x
                => new UserRepository(
                    builder.Configuration.GetConnectionString("CosmosDb"),
                    builder.Configuration["CosmosConfig:primaryKey"],
                    builder.Configuration["CosmosConfig:databaseName"],
                    builder.Configuration["CosmosConfig:containerUserName"]
                )
            );
            builder.Services.AddScoped<IStorageRepository, StorageRepository>(x
                => new StorageRepository(
                    builder.Configuration.GetConnectionString("CosmosDb"),
                    builder.Configuration["CosmosConfig:primaryKey"],
                    builder.Configuration["CosmosConfig:databaseName"],
                    builder.Configuration["CosmosConfig:containerStorageName"]
                )
            );
            builder.Services.AddScoped<IStorageTypeRepository, StorageTypeRepository>(x
               => new StorageTypeRepository(
                   builder.Configuration.GetConnectionString("CosmosDb"),
                   builder.Configuration["CosmosConfig:primaryKey"],
                   builder.Configuration["CosmosConfig:databaseName"],
                   builder.Configuration["CosmosConfig:containerStorageTypeName"]
               )
            );
            builder.Services.AddScoped<IDocumentRepository, DocumentRepository>(x
               => new DocumentRepository(
                   builder.Configuration.GetConnectionString("CosmosDb"),
                   builder.Configuration["CosmosConfig:primaryKey"],
                   builder.Configuration["CosmosConfig:databaseName"],
                   builder.Configuration["CosmosConfig:containerDocumentName"]
               )
            );
            builder.Services.AddScoped<IContractRepository, ContractRepository>(x
               => new ContractRepository(
                   builder.Configuration.GetConnectionString("CosmosDb"),
                   builder.Configuration["CosmosConfig:primaryKey"],
                   builder.Configuration["CosmosConfig:databaseName"],
                   builder.Configuration["CosmosConfig:containerContractName"]
               )
            );
            builder.Services.AddSingleton(new BlobStorageService(storageConnectionString));


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

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
                    ValidAudience = builder.Configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtConfig:Key"]!)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });
            builder.Services.AddAuthorization();
            builder.Services.AddScoped<JwtService>();

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
            app.UseAuthentication(); 
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}