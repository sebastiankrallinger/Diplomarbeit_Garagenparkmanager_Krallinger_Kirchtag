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
        //alle Lager laden
        [HttpGet("allobjects")]
        public async Task<IActionResult> GetAllStorages()
        {
            var results = await _storageRepository.GetAll();
            return Ok(results);
        }

        //einen Storage laden
        [HttpGet("storage/{id}")]
        public async Task<IActionResult> GetStorage(string id)
        {
            var results = await _storageRepository.GetStorage(id);
            return Ok(results);
        }

        //Buchungsstatus ändern
        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody]Storage storage)
        {
            if (storage.Booked == false)
            {
                storage.Booked = true;
            }else if (storage.Booked == true)
            {
                storage.Booked = false;
            }
            var results = await _storageRepository.UpdateStatus(storage);
            return Ok(results);
        }

        //Lager erstellen
        [HttpPost("addobject")]
        public async Task<IActionResult> AddNewStorage([FromBody]NewStorage storage)
        {
            if (storage.Storagetype != "")
            {
                StorageType type = StorageType.buero;
                if (storage.Storagetype != null)
                {
                    if (storage.Storagetype == "garage")
                    {
                        type = StorageType.garage;
                    }
                    else if (storage.Storagetype == "kleinlager")
                    {
                        type = StorageType.kleinlager;
                    }
                }
                if (storage.RoomSize > 1 && storage.Price > 1 && storage.Name != "")
                {
                    var newStorage = new Models.Storage
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = storage.Name,
                        RoomSize = storage.RoomSize,
                        Price = storage.Price,
                        Booked = storage.Booked,
                        Storagetype = type,
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
            else
            {
                return BadRequest("Fehler bei Objekterstellung");
            }
        }

        //Vpi als CSV laden
        [HttpGet("vpi")]
        public async Task<IActionResult> GetVpiData()
        {
            var url = "https://data.statistik.gv.at/data/OGD_vpi10_VPI_2010_1.csv";
            var client = new HttpClient();
            var data = await client.GetStringAsync(url);
            return Ok(data);
        }
    }
}
