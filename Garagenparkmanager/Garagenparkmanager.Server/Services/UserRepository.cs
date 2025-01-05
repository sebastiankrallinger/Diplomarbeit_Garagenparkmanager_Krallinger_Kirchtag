using Garagenparkmanager.Server.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.VisualBasic;
using System.ComponentModel;

namespace Garagenparkmanager.Server.Services
{
    //Verwaltung Datenbankzugriffe
    public class UserRepository : IUserRepository
    {
        private readonly Microsoft.Azure.Cosmos.Container _container;

        //Verbindung zu CosmosDB
        public UserRepository(
            string conn,
            string key,
            string databaseName,
            string containerUserName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerUserName);
        }

        //Kunden erstellen
        public async Task<Models.User> CreateCustomer(Models.User customer)
        {
            var response = await _container.CreateItemAsync(customer, new PartitionKey((double)(customer.Role)));
            return response.Resource;
        }

        //Admin erstellen
        public async Task<Models.AdminData> CreateAdmin(Models.AdminData admin)
        {
            var response = await _container.CreateItemAsync(admin, new PartitionKey((double)(admin.Role)));
            return response.Resource;
        }

        //Kunden bearbeiten
        public async Task<Models.User> EditCustomer(Models.User customer)
        {
            var response = await _container.ReplaceItemAsync(customer, customer.Id, new PartitionKey((double)customer.Role));
            return response.Resource;
        }

        //Admin bearbeiten
        public async Task<Models.AdminData> EditAdmin(Models.AdminData admin)
        {
            var response = await _container.ReplaceItemAsync(admin, admin.Id, new PartitionKey((double)admin.Role));
            return response.Resource;
        }

        //User loeschen
        public async Task<bool> DeleteUser(string id, Role role)
        {
            var response = await _container.DeleteItemAsync<Models.User>(id, new PartitionKey((double)role));
            if (response != null)
            {
                return true;
            }
            return false;
        }

        //alle Benutzer laden
        public async Task<IEnumerable<Models.User>> GetAll()
        {
            var query = _container.GetItemQueryIterator<Models.User>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Models.User>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        //einen Kunden laden
        public async Task<Models.User> GetCustomer(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<Models.User>(query);

            if (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                return response.FirstOrDefault();
            }

            return null;
        }

        //einen Admin laden
        public async Task<Models.AdminData> GetAdmin(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<Models.AdminData>(query);

            if (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                return response.FirstOrDefault();
            }

            return null;
        }

        //alle Kunden laden
        public async Task<IEnumerable<Models.User>> GetAllCustomers()
        {
            var query = _container.GetItemQueryIterator<Models.User>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Models.User>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                foreach (var r in response)
                {
                    if (r.Role == Role.user)
                    {
                        results.Add(r);
                    }

                }
            }
            return results;
        }

        //alle Admins laden
        public async Task<IEnumerable<Models.User>> GetAllAdmins()
        {
            var query = _container.GetItemQueryIterator<Models.User>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Models.User>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                foreach (var r in response)
                {
                    if (r.Role == Role.admin)
                    {
                        results.Add(r);
                    }

                }
            }
            return results;
        }
    }
}
