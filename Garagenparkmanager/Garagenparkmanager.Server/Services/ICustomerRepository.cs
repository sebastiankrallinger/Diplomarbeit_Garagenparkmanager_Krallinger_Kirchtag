using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAll();
        Task<Customer> CreateCustomer(Customer customer);
        Task<bool> DeleteCustomer (string id, string name);
    }
}
