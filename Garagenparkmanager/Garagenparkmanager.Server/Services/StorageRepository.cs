﻿using Microsoft.Azure.Cosmos;
using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public class StorageRepository : IStorageRepository
    {
        private readonly Container _container;

        //Verbindung zu CosmosDB
        public StorageRepository(
            string conn,
            string key,
            string databaseName,
            string containerStorageName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerStorageName);
        }

        //Storage erstellen
        public async Task<Storage> CreateStorage(Storage storage)
        {
            var response = await _container.CreateItemAsync(storage, new PartitionKey(storage.Id));
            return response.Resource;
        }

        //alle Kunden laden
        public async Task<IEnumerable<Storage>> GetAll()
        {
            var query = _container.GetItemQueryIterator<Storage>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Storage>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        public async Task<Models.Storage> GetStorage(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<Models.Storage>(query);

            if (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                return response.FirstOrDefault();
            }

            return null;
        }

        public async Task<Models.Storage> UpdateStatus(Storage storage)
        {
            var response = await _container.ReplaceItemAsync(storage, storage.Id, new PartitionKey(storage.Id));
            return response.Resource;
        }
    }
}