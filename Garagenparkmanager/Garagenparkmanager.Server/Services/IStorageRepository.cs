using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface IStorageRepository
    {
        Task<IEnumerable<Storage>> GetAll();
        Task<Storage> CreateStorage(Storage storage);
    }
}
