using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Garagenparkmanager.Server.Services
{
    public class JwtService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IConfiguration _configuration;

        public JwtService(ICustomerRepository customerRepository, IConfiguration configuration)
        {
            _customerRepository = customerRepository;
            _configuration = configuration;
        }

        public async Task<LoginResponse?> Authenticate(LoginData request)
        {
            if (request.Email is null || request.Password is null)
            {
                return null;
            }

            var users = await _customerRepository.GetAll();
            var passwordHandler = new Services.PasswordHandler();
            foreach (Models.User u in users)
            {
                if (request.Email == u.Email)
                {
                    if (passwordHandler.ValidatePassword(request.Password, u.Password, u.Salt))
                    {
                        var issuer = _configuration["JwtConfig:Issuer"];
                        var audience = _configuration["JwtConfig:Audience"];
                        var key = _configuration["JwtConfig:Key"];
                        var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");
                        var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new System.Security.Claims.ClaimsIdentity(new[]
                            {
                                new Claim(JwtRegisteredClaimNames.Name, request.Email)
                            }),
                            Expires = tokenExpiryTimeStamp,
                            Issuer = issuer,
                            Audience = audience,
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                                SecurityAlgorithms.HmacSha512Signature),
                        };

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                        var accessToken = tokenHandler.WriteToken(securityToken);

                        return new LoginResponse
                        {
                            Accesstoken = accessToken,
                            Email = request.Email,
                            Role = u.Role,
                            ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.UtcNow).TotalSeconds
                        };
                    }
                }
            }
            return null;
        }
    }
}
