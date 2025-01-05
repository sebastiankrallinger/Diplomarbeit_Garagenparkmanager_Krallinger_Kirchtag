using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;

namespace Garagenparkmanager.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly JwtService _jwtService;
        private readonly UserController _userController;
        public AccountController(JwtService jwtService, IUserRepository customerRepository, IConfiguration configuration)
        {
            _jwtService = jwtService;
            _userController = new UserController(customerRepository, configuration);
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

        [AllowAnonymous]
        [HttpPost("registerCustomer")]
        public async Task<ActionResult<LoginResponse>> RegisterAsync([FromBody] RegisterDataCustomer userdata)
        {
            //GetByEmail implementieren
            var passwordHandler = new Services.PasswordHandler();
            if (userdata.Password != "")
            {
                var (passwordHash, salt) = passwordHandler.HashPassword(userdata.Password);
            
                if (userdata.Firstname != "" && userdata.Lastname != "" && userdata.Birthdate != "" && userdata.Plz != "" && userdata.Location != "" && userdata.Street != "" && userdata.Housenumber != "" && userdata.Email != "")
                {
                    var newUser = new Models.User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Role = Role.user,
                        Firstname = userdata.Firstname,
                        Lastname = userdata.Lastname,
                        Birthdate = Convert.ToDateTime(userdata.Birthdate),
                        Plz = userdata.Plz,
                        Location = userdata.Location,
                        Street = userdata.Street,
                        Housenumber = Convert.ToInt32(userdata.Housenumber),
                        HousenumberAddition = userdata.HousenumberAddition,
                        Email = userdata.Email,
                        CompanyName = userdata.CompanyName,
                        AtuNumber = userdata.AtuNumber,
                        Password = passwordHash,
                        Salt = salt,
                        Storages = new List<Storage>(),
                        Contracts = new List<Contract>()
                    };
                    var response = await _userController.AddNewUser(newUser);
                    if (response == null)
                    {
                        return BadRequest("Fehlerhafte Benutzerdaten");
                    }
                    else
                    {
                        LoginData data = new();
                        data.Email = userdata.Email;
                        data.Password = userdata.Password;
                        var result = await _jwtService.Authenticate(data);
                        if (result is null)
                        {
                            return Unauthorized("Ungültige Anmeldedaten");
                        }

                        return result;
                    }
                }
                else
                {
                    return BadRequest("Fehlerhafte Benutzerdaten");
                }
            }
            else
            {
                return Unauthorized("Ungültiges Passwort");
            }
        }

        [AllowAnonymous]
        [HttpPost("registerAdmin")]
        public async Task<ActionResult<LoginResponse>> RegisterAdminAsync([FromBody] RegisterDataAdmin adminData)
        {
            var passwordHandler = new Services.PasswordHandler();
            var (passwordHash, salt) = passwordHandler.HashPassword(adminData.Password);

            if (adminData.Firstname != "" && adminData.Lastname != "" && adminData.Email != "" && adminData.Password != "")
            {
                var newAdmin = new Models.AdminData
                {
                    Id = Guid.NewGuid().ToString(),
                    Role = Role.admin,
                    Firstname = adminData.Firstname,
                    Lastname = adminData.Lastname,
                    Email = adminData.Email,
                    Password = passwordHash,
                    Salt = salt
                };
                var response = await _userController.AddNewAdmin(newAdmin);
                if (response == null)
                {
                    return BadRequest("Fehler bei der Benutzerregistrierung");
                }
                else
                {
                    LoginData data = new();
                    data.Email = adminData.Email;
                    data.Password = adminData.Password;
                    var result = await _jwtService.Authenticate(data);
                    if (result is null)
                    {
                        return Unauthorized("Ungültige Anmeldedaten");
                    }

                    return result;
                }
            }
            else
            {
                return BadRequest("Fehlerhafte Benutzerdaten");
            }
        }
    }
}
