using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface INewsRepository
    {
        Task<IEnumerable<News>> GetAll();
        Task<News> GetNews(string id);
        Task<News> CreateNews(News news);
        Task<bool> DeleteNews(string id);
    }
}
