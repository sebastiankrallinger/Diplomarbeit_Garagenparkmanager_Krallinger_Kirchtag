using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung User
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IConfiguration _configuration;

        public UserController(ICustomerRepository customerRepository, IConfiguration configuration)
        {
            _customerRepository = customerRepository;
            _configuration = configuration;
        }

        //alle Kunden laden
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var results = await _customerRepository.GetAll();
            return Ok(results);
        }

        //Kunden erstellen
        [HttpPost]
        private async Task<IActionResult> AddNewUser(Models.User user)
        {
            var result = await _customerRepository.CreateCustomer(user);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Kunden loeschen
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id, Role role)
        {
            var result = await _customerRepository.DeleteCustomer(id, role);
            if (result)
            {
                return NoContent();
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterData userdata)
        {
            //GetByEmail implementieren
            var passwordHandler = new Services.PasswordHandler();
            var (passwordHash, salt) = passwordHandler.HashPassword(userdata.Password);

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
            var response = await AddNewUser(newUser);
            if (response == null)
            {
                return BadRequest("Fehler bei der Benutzerregistrierung");
            }

            return Ok(response);
        }
    }
}
