using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;

//Blob Storage Service
namespace Garagenparkmanager.Server.Services
{
    public class BlobStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName = "documents";

        public BlobStorageService(string storageConnectionString)
        {
            _blobServiceClient = new BlobServiceClient(storageConnectionString);
        }

        //Dokument auf den Blob Storage hochladen
        public async Task<string> UploadFileAsync(byte[] fileBytes, string fileName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);
            var fileStream = new MemoryStream(fileBytes);

            await blobClient.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = "application/pdf" });

            return blobClient.Uri.ToString();
        }

        //Dokument aus dem Blob Storage entfernen
        public async Task Delete(string fileName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);

            await blobClient.DeleteIfExistsAsync();
        }
    }
}
