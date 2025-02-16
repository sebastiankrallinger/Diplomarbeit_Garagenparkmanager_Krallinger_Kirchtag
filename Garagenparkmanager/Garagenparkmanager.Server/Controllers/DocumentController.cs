using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
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
        private readonly BlobStorageService _blobStorageService;

        public DocumentController(IDocumentRepository documentRepository, IConfiguration configuration, BlobStorageService blobStorageService)
        {
            _documentRepository = documentRepository;
            _configuration = configuration;
            _blobStorageService = blobStorageService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromForm] IFormFile document)
        {
            if (document == null || document.Length == 0)
            {
                return BadRequest("Keine Datei hochgeladen.");
            }

            using var stream = document.OpenReadStream();
            var fileUrl = await _blobStorageService.UploadFileAsync(stream, document.FileName);

            // Datei-URL in Cosmos DB speichern
            await _documentRepository.SaveFileMetadataAsync(new Document { Id = Guid.NewGuid().ToString(), FileName = document.FileName, FileUrl = fileUrl });

            return Ok(new { FileUrl = fileUrl });
        }

        //alle Dokumente laden
        [HttpGet("documents")]
        public async Task<IActionResult> GetAllDocuments()
        {
            var results = await _documentRepository.GetAll();
            return Ok(results);
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
