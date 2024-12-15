using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly JwtService _jwtService;

        public AccountController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginAsync([FromBody] LoginData userdata)
        {
            var result = await _jwtService.Authenticate(userdata);
            if (result is null)
            {
                return Unauthorized("Ungültige Anmeldedaten");
            }

            return result;
        }
    }
}
