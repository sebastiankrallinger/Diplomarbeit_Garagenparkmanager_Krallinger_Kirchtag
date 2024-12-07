using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung Kunden
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginData userdata)
        {
            var users = await _customerRepository.GetAll();
            foreach (User u in users)
            {
                if (userdata.Email == u.Email && userdata.Password == u.Password)
                {
                    return Ok(new { Token = "fake-jwt-token" }); 
                }
            }
            return Unauthorized("Ungültige Anmeldedaten");
        }

        public UserController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        //alle Kunden laden
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var results = await _customerRepository.GetAll();
            return Ok(results);
        }

        //Kunden erstellen
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            var result = await _customerRepository.CreateCustomer(user);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        //Kunden loeschen
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, Role role)
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
