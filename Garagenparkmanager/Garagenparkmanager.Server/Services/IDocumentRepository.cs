using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IDocumentRepository
    {
        Task<string> CreateDocument(string type);
        Task<IEnumerable<string>> GetAll();
        Task<string> Delete(string type);
        Task<string> SaveFileMetadataAsync(Document document);
    }
}
