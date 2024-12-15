using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    //Definition der Datenankfunktionen
    public interface ICustomerRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> CreateCustomer(User customer);
        Task<bool> DeleteCustomer (string id, Role role);
    }
}
