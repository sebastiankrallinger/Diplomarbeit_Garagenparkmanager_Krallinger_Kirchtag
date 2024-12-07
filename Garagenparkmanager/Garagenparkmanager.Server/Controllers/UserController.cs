using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung Kunden
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
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
        public async Task<IActionResult> Post([FromBody] Customer customer)
        {
            var result = await _customerRepository.CreateCustomer(customer);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        //Kunden loeschen
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _customerRepository.DeleteCustomer(id);
            if (result)
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
