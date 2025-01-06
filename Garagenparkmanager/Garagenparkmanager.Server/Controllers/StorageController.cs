using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung Storage
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StorageController : Controller
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IConfiguration _configuration;

        public StorageController(IStorageRepository storageRepository, IConfiguration configuration)
        {
            _storageRepository = storageRepository;
            _configuration = configuration;
        }
        //alle Kunden laden
        [HttpGet("allobjects")]
        public async Task<IActionResult> GetAllStorages()
        {
            var results = await _storageRepository.GetAll();
            return Ok(results);
        }

        //Kunden erstellen
        [HttpPost("addobject")]
        public async Task<IActionResult> AddNewStorage(Storage storage)
        {
            var result = await _storageRepository.CreateStorage(storage);
            return CreatedAtAction(nameof(GetAllStorages), new { id = result.Id }, result);
        }
    }
}
