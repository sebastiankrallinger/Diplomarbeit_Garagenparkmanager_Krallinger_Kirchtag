using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    //Definition der Datenankfunktionen
    public interface ICustomerRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetUser(string id);
        Task<IEnumerable<User>> GetAllCustomers();
        Task<IEnumerable<User>> GetAllAdmins();
        Task<User> CreateCustomer(User customer);
        Task<AdminData> CreateAdmin(AdminData admin);
        Task<bool> DeleteUser(string id, Role role);
        Task<Models.User> EditCustomer(Models.User customer);
    }
}
