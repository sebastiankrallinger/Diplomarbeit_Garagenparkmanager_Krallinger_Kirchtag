using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    //Verwaltung Dokumente
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DocumentController : Controller
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IConfiguration _configuration;
        public DocumentController(IDocumentRepository documentRepository, IConfiguration configuration)
        {
            _documentRepository = documentRepository;
            _configuration = configuration;
        }

        //alle Dokumente laden
        [HttpGet("users")]
        public async Task<IActionResult> GetAllDocuments()
        {
            var results = await _documentRepository.GetAll();
            return Ok(results);
        }

        //Dokument erstellen
        [HttpPost("addocument")]
        public async Task<IActionResult> AddNewDocument([FromBody] Document document)
        {
            document.Id = Guid.NewGuid().ToString();
            var result = await _documentRepository.CreateDocument(document.File);
            return CreatedAtAction(nameof(GetAllDocuments), new { id = document.Id }, result);
        }

        //Document loeschen
        [HttpDelete("deleteDocument/{type}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _documentRepository.Delete(id);
            if (result != "")
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
