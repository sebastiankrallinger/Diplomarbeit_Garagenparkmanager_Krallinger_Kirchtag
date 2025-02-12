using Garagenparkmanager.Server.Models;

//Interface des News-Repository
namespace Garagenparkmanager.Server.Services
{
    public interface INewsRepository
    {
        Task<IEnumerable<News>> GetAll();
        Task<News> CreateNews(News news);
        Task<News> GetNews(string id);
        Task<News> UpdateNews(News news);
        Task<bool> DeleteNews(string id);
    }
}
