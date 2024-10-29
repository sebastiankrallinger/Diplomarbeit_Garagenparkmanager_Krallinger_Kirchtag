using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var results = await _customerRepository.GetAll();
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customer customer)
        {
            var result = await _customerRepository.CreateCustomer(customer);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, string name)
        {
            var result = await _customerRepository.DeleteCustomer(id, name);
            if (result)
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
