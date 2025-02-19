using Azure.Core;
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
        public async Task<IActionResult> UploadFile([FromBody] FileUploadRequest file)
        {
            if (string.IsNullOrEmpty(file.File))
            {
                return BadRequest("Die Datei ist leer oder fehlt.");
            }

            byte[] fileBytes = Convert.FromBase64String(file.File);

            var fileUrl = await _blobStorageService.UploadFileAsync(fileBytes, file.FileName);

            var document = new Document
            {
                Id = Guid.NewGuid().ToString(),
                FileName = file.FileName,
                FileUrl = fileUrl
            };

            await _documentRepository.SaveFileMetadataAsync(document);

            return Ok(new { FileUrl = fileUrl });
        }

        //alle Dokumente laden
        [HttpGet("documents")]
        public async Task<IActionResult> GetAll()
        {
            var results = await _documentRepository.GetAll();
            return Ok(results);
        }


        //Document loeschen
        [HttpDelete("deleteDocument/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var document = await _documentRepository.GetDocument(id);

            await _blobStorageService.Delete(document.FileName);

            var result = await _documentRepository.Delete(id);

            if (result != "")
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
