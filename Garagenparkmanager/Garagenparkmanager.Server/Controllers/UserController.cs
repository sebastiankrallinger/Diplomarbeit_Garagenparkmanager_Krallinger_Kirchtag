using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.Security.Cryptography;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung User
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public UserController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
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

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginData userdata)
        {
            var users = await _customerRepository.GetAll();
            foreach (Models.User u in users)
            {
                if (userdata.Email == u.Email)
                {
                    if (ValidatePassword(userdata.Password, u.Password, u.Salt))
                    {
                        return Ok(new { Token = "fake-jwt-token" });
                    }
                }
            }
            return Unauthorized("Ungültige Anmeldedaten");
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterData userdata)
        {
            //GetByEmail implementieren
            var (passwordHash, salt) = HashPassword(userdata.Password);

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

        private (string hashedPassword, string salt) HashPassword(string enteredPassword)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(16);

            string passwordHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return (passwordHashed, Convert.ToBase64String(salt));
        }

        private bool ValidatePassword(string enteredPassword, string storedHash, string storedSalt)
        {
            byte[] salt = Convert.FromBase64String(storedSalt);

            string enteredHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return storedHash == enteredHash;
        }
    }
}
