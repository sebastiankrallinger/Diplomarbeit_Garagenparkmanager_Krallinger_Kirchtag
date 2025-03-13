using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IStorageRepository
    {
        Task<IEnumerable<Storage>> GetAll();
        Task<Storage> CreateStorage(Storage storage);
        Task<Models.Storage> GetStorage(string id);
        Task<Models.Storage> UpdateStorage(Storage storage);
        Task<bool> DeleteStorage(string id);

    }
}
