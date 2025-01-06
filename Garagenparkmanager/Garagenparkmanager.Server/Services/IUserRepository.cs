using Garagenparkmanager.Server.Models;

//Datenankfunktionen Userfunktionen

namespace Garagenparkmanager.Server.Services
{
    public interface IUserRepository
    {
        Task<IEnumerable<Customer>> GetAll();
        Task<Customer> GetCustomer(string id);
        Task<AdminData> GetAdmin(string id);
        Task<IEnumerable<Customer>> GetAllCustomers();
        Task<IEnumerable<Customer>> GetAllAdmins();
        Task<Customer> CreateCustomer(Customer customer);
        Task<AdminData> CreateAdmin(AdminData admin);
        Task<bool> DeleteUser(string id, Role role);
        Task<Models.Customer> EditCustomer(Models.Customer customer);
        Task<Models.AdminData> EditAdmin(Models.AdminData admin);

    }
}
