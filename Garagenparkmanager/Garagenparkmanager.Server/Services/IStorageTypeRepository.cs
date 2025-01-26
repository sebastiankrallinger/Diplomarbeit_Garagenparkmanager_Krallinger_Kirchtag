using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IStorageTypeRepository
    {
        Task<string> CreateStorageType(string type);
        Task<IEnumerable<string>> GetAll();
        Task<string> Delete(string type);
    }
}
