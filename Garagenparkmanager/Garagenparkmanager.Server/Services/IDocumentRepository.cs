namespace Garagenparkmanager.Server.Services
{
    public interface IDocumentRepository
    {
        Task<string> CreateDocument(string type);
        Task<IEnumerable<string>> GetAll();
        Task<string> Delete(string type);
    }
}
