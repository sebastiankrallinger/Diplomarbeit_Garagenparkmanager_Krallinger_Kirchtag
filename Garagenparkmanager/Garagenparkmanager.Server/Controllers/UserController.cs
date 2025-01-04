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

        //alle Benutzer laden
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUser()
        {
            var results = await _customerRepository.GetAll();
            return Ok(results);
        }

        //alle Kunden laden
        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomer()
        {
            var results = await _customerRepository.GetAllCustomers();
            return Ok(results);
        }

        //alle Admins laden
        [HttpGet("admins")]
        public async Task<IActionResult> GetAllAdmins()
        {
            var results = await _customerRepository.GetAllAdmins();
            return Ok(results);
        }

        //einen Benutzer laden
        [HttpGet("getUser/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var results = await _customerRepository.GetUser(id);
            return Ok(results);
        }

        //Kunden erstellen
        [HttpPost("customer")]
        public async Task<IActionResult> AddNewUser(Models.User user)
        {
            var result = await _customerRepository.CreateCustomer(user);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Admin erstellen
        [HttpPost("admin")]
        public async Task<IActionResult> AddNewAdmin(Models.AdminData adminData)
        {
            var result = await _customerRepository.CreateAdmin(adminData);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Kunden bearbeiten
        [HttpPut("updateCustomer")]
        public async Task<IActionResult> UpdateCustomer(Models.User user)
        {
            var result = await _customerRepository.EditCustomer(user);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Kunden loeschen
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = _customerRepository.GetUser(id);
            var result = await _customerRepository.DeleteUser(user.Result.Id, user.Result.Role);
            if (result)
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
