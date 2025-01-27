using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface INewsRepository
    {
        Task<IEnumerable<>> GetAll();
        Task<> CreateNews();
        Task<bool> DeleteNews();
    }
}
