using Garagenparkmanager.Server.Models;
using Microsoft.Azure.Cosmos;
using System.ComponentModel;
using System.Data;

namespace Garagenparkmanager.Server.Services
{
    public class StorageTypeRepository : IStorageTypeRepository
    {
        private readonly Microsoft.Azure.Cosmos.Container _container;

        //Verbindung zu CosmosDB
        public StorageTypeRepository(
            string conn,
            string key,
            string databaseName,
            string containerStorageName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerStorageName);
        }

        public async Task<string> CreateStorageType(string type)
        {
            var item = new { id = Guid.NewGuid().ToString(), storagetype = type };
            var response = await _container.CreateItemAsync(item, new PartitionKey(type));
            return response.ToString();
        }

        public async Task<IEnumerable<string>> GetAll()
        {
            var query = _container.GetItemQueryIterator<dynamic>(new QueryDefinition("SELECT c.storagetype FROM c"));

            var results = new List<string>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                foreach (var item in response)
                {
                    results.Add(item.storagetype.ToString());
                }
            }
            return results;
        }

        public async Task<string> Delete(string type)
        {
            var query = _container.GetItemQueryIterator<dynamic>(new QueryDefinition("SELECT * FROM c"));

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                foreach (var item in response)
                {
                    if (item.storagetype == type)
                    {
                        var id = item.id.ToString();
                        await _container.DeleteItemAsync<dynamic>(id, new PartitionKey(type));
                    }
                }
            }

            return "Erfolgreich gelöscht.";
        }
    }
}
