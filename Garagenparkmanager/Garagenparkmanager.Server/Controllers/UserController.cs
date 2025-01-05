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
        private readonly IUserRepository _customerRepository;
        private readonly IConfiguration _configuration;

        public UserController(IUserRepository customerRepository, IConfiguration configuration)
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
        public async Task<IActionResult> AddNewUser(Models.User user)
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
    }
}
