﻿using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

//User verwaltung
namespace Garagenparkmanager.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _customerRepository;
        private readonly IConfiguration _configuration;
        private readonly StorageController _storageController;
        private readonly DocumentController _documentController;


        public UserController(IUserRepository customerRepository, IConfiguration configuration, IStorageRepository _storageRepository, IStorageTypeRepository _storageTypeRepository, IDocumentRepository _documentRepository, IContractRepository _contractRepository, BlobStorageService _blobStorageService)
        {
            _customerRepository = customerRepository;
            _configuration = configuration;
            _storageController = new StorageController(_storageRepository, _storageTypeRepository, configuration);
            _documentController = new DocumentController(_documentRepository, _contractRepository, configuration, _blobStorageService);
        }

        //alle Benutzer laden
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUser()
        {
            var results = await _customerRepository.GetAll();
            return Ok(results);
        }

        //alle Kunden laden
        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomer()
        {
            var results = await _customerRepository.GetAllCustomers();
            return Ok(results);
        }

        //alle Admins laden
        [HttpGet("admins")]
        public async Task<IActionResult> GetAllAdmins()
        {
            var results = await _customerRepository.GetAllAdmins();
            return Ok(results);
        }

        //einen Kunden laden
        [HttpGet("getCustomer/{id}")]
        public async Task<IActionResult> GetCustomer(string id)
        {
            var results = await _customerRepository.GetCustomer(id);
            return Ok(results);
        }

        //Kunden-Id laden
        [HttpGet("getCustomerId/{email}")]
        public async Task<string> GetCustomerId(string email)
        {
            var results = await _customerRepository.GetCustomerId(email);
            return results;
        }


        //einen Admin laden
        [HttpGet("getAdmin/{id}")]
        public async Task<IActionResult> GetAdmin(string id)
        {
            var results = await _customerRepository.GetAdmin(id);
            return Ok(results);
        }


        //Gemietete Objekte laden
        [HttpGet("getStorages/{id}")]
        public async Task<IActionResult> GetStorages(string id)
        {
            var results = await _customerRepository.GetStorages(id);
            return Ok(results);
        }

        //Kunden erstellen
        [HttpPost("customer")]
        public async Task<IActionResult> AddNewUser(Models.Customer customer)
        {
            var result = await _customerRepository.CreateCustomer(customer);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Admin erstellen
        [HttpPost("admin")]
        public async Task<IActionResult> AddNewAdmin(Models.Admin admin)
        {
            var result = await _customerRepository.CreateAdmin(admin);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Kunden bearbeiten
        [HttpPut("updateCustomer")]
        public async Task<IActionResult> UpdateCustomer(Models.Customer customer)
        {
            var result = await _customerRepository.EditCustomer(customer);
            return Ok(result);
        }

        //Storage hinzufuegen
        [HttpPut("addStorage/{id}")]
        public async Task<IActionResult> AddStorage(string id, [FromBody] Models.Storage storage)
        {
            Customer customer = await _customerRepository.GetCustomer(id);

            if (customer == null)
            {
                return NotFound("Kunde mit der Id: " + id + " konnte nicht gefunden werden");
            }

            storage.Booked = true;
            customer.Storages.Add(storage);
            await _storageController.addContract(storage.Id, storage.activeContract);
            var result = await _customerRepository.EditCustomer(customer);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Admin bearbeiten
        [HttpPut("updateAdmin")]
        public async Task<IActionResult> UpdateAdmin(Models.Admin admin)
        {
            var result = await _customerRepository.EditAdmin(admin);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }

        //Vertrag zur Historie hinzufügen
        [HttpPut("updateContractHistory/{id}")]
        public async Task<IActionResult> UpdateContractHistory(string id, [FromBody] Contract contract)
        {
            var customer = await _customerRepository.GetCustomer(id);

            if (customer == null)
            {
                return NotFound("Kunde mit der Id: " + id + " konnte nicht gefunden werden");
            }

            customer.Contracts.Add(contract);
            return Ok(customer);
        }

        //User loeschen
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = _customerRepository.GetCustomer(id);

            if (user == null)
            {
                return NotFound("User mit der Id: " + id + " konnte nicht gelöscht werden");
            }

            if (user.Result.Storages != null)
            {
                var storages = user.Result.Storages;
                foreach (Storage s in storages)
                {
                    var response = await _storageController.UpdateStatus(s);
                }
            }
            var result = await _customerRepository.DeleteUser(user.Result.Id, user.Result.Role);
            if (result)
            {
                return NoContent();
            }
            return BadRequest("Fehler beim Löschen des Users");
        }

        //Objekt vom Benutzer aktualisieren
        [HttpPut("updateStorage/{id}")]
        public async Task<IActionResult> UpdateStorage(string id, [FromBody] Models.Storage storage)
        {
            Customer customer = await _customerRepository.GetCustomer(id);

            if (customer == null)
            {
                return NotFound("Kunde mit der Id: " + id + " konnte nicht gefunden werden");
            }

            if (customer.Storages != null)
            {
                var storages = customer.Storages;
                foreach (Storage s in storages)
                {
                    if (s.Id == storage.Id)
                    {
                        customer.Storages.Remove(s);
                        customer.Storages.Add(storage);
                        break;
                    }
                }
            }
            var result = await _customerRepository.EditCustomer(customer);
            return Ok(result);
        }

        //Objekt vom Benutzer entfernen
        [HttpPut("deleteStorage/{id}")]
        public async Task<IActionResult> DeleteStorage(string id, [FromBody] Models.Storage storage)
        {
            Customer customer = await _customerRepository.GetCustomer(id);

            if (customer == null)
            {
                return NotFound("Kunde mit der Id: " + id + " konnte nicht gefunden werden");
            }

            if (customer.Storages != null)
            {
                var storages = customer.Storages;
                foreach (Storage s in storages)
                {
                    if (s.Id == storage.Id)
                    {
                        var response = await _storageController.UpdateStatus(s);
                        foreach(Contract c in customer.Contracts)
                        {
                            if (c.Id == storage.activeContract.Id)
                            {
                                c.Status = false;
                            }
                        }
                        customer.Storages.Remove(s);
                        break;
                    }
                }
            }
            var result = await _customerRepository.EditCustomer(customer);
            return CreatedAtAction(nameof(GetAllUser), new { id = result.Id }, result);
        }
    }
}
