using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IContractRepository
    {
        Task<string> CreateContract(string contract);
        Task<IEnumerable<Contract>> GetAll();
        Task<string> Delete(string id);
        Task<Contract> GetContract(string id);
        Task<string> SaveFileMetadataAsync(Document contract);
    }
}
