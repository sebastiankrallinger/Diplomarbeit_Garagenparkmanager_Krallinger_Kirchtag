using Garagenparkmanager.Server.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.VisualBasic;

namespace Garagenparkmanager.Server.Services
{
    //Verwaltung Datenbankzugriffe
    public class UserRepository : IUserRepository
    {
        private readonly Container _container;

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
        public async Task<Models.User> CreateCustomer(Models.User consumer)
        {
            var response = await _container.CreateItemAsync(consumer, new PartitionKey((double)(consumer.Role)));
            return response.Resource;
        }

        //Kunden loeschen
        public async Task<bool> DeleteCustomer(string id, Role role)
        {
            var response = await _container.DeleteItemAsync<Models.User>(id, new PartitionKey((double)role));
            if (response != null)
            {
                return true;
            }
            return false;
        }

        //alle Kunden laden
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
    }
}
