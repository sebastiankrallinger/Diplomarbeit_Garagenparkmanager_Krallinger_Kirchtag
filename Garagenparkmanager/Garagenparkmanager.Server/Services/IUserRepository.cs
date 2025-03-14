﻿using Garagenparkmanager.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Services
{
    public interface IUserRepository
    {
        Task<IEnumerable<Customer>> GetAll();
        Task<Customer> GetCustomer(string id);
        Task<string> GetCustomerId(string email);
        Task<Admin> GetAdmin(string id);
        Task<IEnumerable<Customer>> GetAllCustomers();
        Task<IEnumerable<Customer>> GetAllAdmins();
        Task<Customer> CreateCustomer(Customer customer);
        Task<Admin> CreateAdmin(Admin admin);
        Task<bool> DeleteUser(string id, Role role);
        Task<Models.Customer> EditCustomer(Models.Customer customer);
        Task<Models.Admin> EditAdmin(Models.Admin admin);
        Task<IEnumerable<Models.Storage>> GetStorages(string id);

    }
}
