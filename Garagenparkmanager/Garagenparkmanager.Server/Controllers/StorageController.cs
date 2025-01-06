using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Garagenparkmanager.Server.Models;
using Microsoft.AspNetCore.Identity;

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
        public async Task<IActionResult> AddNewStorage([FromBody]NewStorage storage)
        {
            if (storage.RoomSize != null && storage.Price != null && storage.Booked != null && storage.Storagetype != null)
            {
                var newStorage = new Models.Storage
                {
                    Id = Guid.NewGuid().ToString(),
                    RoomSize = storage.RoomSize,
                    Price = storage.Price,
                    Booked = storage.Booked,
                    Storagetype = storage.Storagetype,
                    activeContract = null
                };
                var result = await _storageRepository.CreateStorage(newStorage);
                return CreatedAtAction(nameof(GetAllStorages), new { id = result.Id }, result);
            }
            else
            {
                return BadRequest("Fehler bei Objekterstellung");
            }
        }
    }
}
