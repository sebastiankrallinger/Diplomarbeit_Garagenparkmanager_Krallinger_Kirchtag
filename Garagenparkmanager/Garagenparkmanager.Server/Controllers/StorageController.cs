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
        private readonly IStorageTypeRepository _storageTypeRepository;
        private readonly IConfiguration _configuration;

        public StorageController(IStorageRepository storageRepository, IStorageTypeRepository storageTypeRepository, IConfiguration configuration)
        {
            _storageRepository = storageRepository;
            _storageTypeRepository = storageTypeRepository;
            _configuration = configuration;
        }
        //alle Lager laden
        [HttpGet("allobjects")]
        [AllowAnonymous]
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
                storage.activeContract = null;
            }
            var results = await _storageRepository.UpdateStorage(storage);
            return Ok(results);
        }

        //Lager erstellen
        [HttpPost("addobject")]
        public async Task<IActionResult> AddNewStorage([FromBody]Storage storage)
        {
            if (storage.RoomSize >= 0 && storage.Price >= 0 && storage.Name != "" && storage.Storagetype != "")
            {
                storage.Id = Guid.NewGuid().ToString();
                var result = await _storageRepository.CreateStorage(storage);
                return CreatedAtAction(nameof(GetAllStorages), new { id = result.Id }, result);
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

        //aktiven Vertrag hinzufuegen
        [HttpPut("addActiveContract/{id}")]
        public async Task<IActionResult> addContract(string id, [FromBody] Contract activeContract)
        {
            Storage storage = await _storageRepository.GetStorage(id);
            storage.activeContract = activeContract;
            var result = await _storageRepository.UpdateStorage(storage);
            return Ok(storage);
        }

        //Objekttypen laden
        [HttpGet("alltypes")]
        public async Task<IActionResult> GetAllTypes()
        {
            var results = await _storageTypeRepository.GetAll();
            return Ok(results);
        }

        //Objekttyp hinzufuegen
        [HttpPost("addType")]
        public async Task<bool> AddType([FromBody] string type)
        {
            var result = await _storageTypeRepository.CreateStorageType(type);
            return true;
        }

        //Objekttyp loeschen
        [HttpDelete("deleteStorageType/{type}")]
        public async Task<IActionResult> DeleteType(string type)
        {
            var result = await _storageTypeRepository.Delete(type);
            if (result != "")
            {
                return NoContent();
            }
            return BadRequest();
        }

        [HttpPut("updateStorage")]
        public async Task<IActionResult> UpdateStorage([FromBody] Storage storage)
        {
            var results = await _storageRepository.UpdateStorage(storage);
            return Ok(results);
        }

        [HttpDelete("deleteStorage/{id}")]
        public async Task<IActionResult> DeleteStorage(string id)
        {
            var result = await _storageRepository.DeleteStorage(id);
            if (result != false)
            {
                return NoContent();
            }
            return BadRequest();
        }

    }
}
