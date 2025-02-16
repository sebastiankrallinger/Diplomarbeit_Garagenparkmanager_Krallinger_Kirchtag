using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;

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

        public async Task<string> UploadFileAsync(byte[] fileBytes, string fileName)
        {
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainer.GetBlobClient(fileName);
            var fileStream = new MemoryStream(fileBytes);

            await blobClient.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = "application/pdf" });

            return blobClient.Uri.ToString();
        }
    }
}
