using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IDocumentRepository
    {
        Task<string> CreateDocument(string document);
        Task<IEnumerable<Document>> GetAll();
        Task<string> Delete(string id);
        Task<Document> GetDocument(string id);
        Task<string> SaveFileMetadataAsync(Document document);
    }
}
