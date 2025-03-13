using Azure.Core;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    //Dokumente verwalten
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DocumentController : Controller
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IContractRepository _contractRepository;
        private readonly IConfiguration _configuration;
        private readonly BlobStorageService _blobStorageService;

        public DocumentController(IDocumentRepository documentRepository, IContractRepository contractRepository, IConfiguration configuration, BlobStorageService blobStorageService)
        {
            _documentRepository = documentRepository;
            _contractRepository = contractRepository;
            _configuration = configuration;
            _blobStorageService = blobStorageService;
        }

        //Dokument auf Blob Storage hochladen
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


        //Dokument loeschen
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

        //Vertrag auf Blob Storage hochladen
        [HttpPost("uploadContract")]
        public async Task<IActionResult> UploadContract([FromBody] FileUploadRequest file)
        {
            if (string.IsNullOrEmpty(file.File))
            {
                return BadRequest("Die Datei ist leer oder fehlt.");
            }

            byte[] fileBytes = Convert.FromBase64String(file.File);

            var fileUrl = await _blobStorageService.UploadFileAsync(fileBytes, file.FileName);
            var contract = new Document
            {
                Id = Guid.NewGuid().ToString(),
                FileName = file.FileName,
                FileUrl = fileUrl
            };
            await _contractRepository.SaveFileMetadataAsync(contract);

            return Ok(new { FileUrl = fileUrl });
        }

        //alle Verträge laden
        [HttpGet("contracts")]
        public async Task<IActionResult> GetAllContracts()
        {
            var results = await _contractRepository.GetAll();
            return Ok(results);
        }


        //Vertrag loeschen
        [HttpDelete("deleteContract/{id}")]
        public async Task<IActionResult> DeleteContract(string id)
        {
            var contract = await _contractRepository.GetContract(id);

            await _blobStorageService.Delete(contract.FileName);

            var result = await _contractRepository.Delete(id);

            if (result != "")
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
