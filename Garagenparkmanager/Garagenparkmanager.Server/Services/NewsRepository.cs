﻿using Garagenparkmanager.Server.Models;
using Microsoft.Azure.Cosmos;

namespace Garagenparkmanager.Server.Services
{
    public class NewsRepository : INewsRepository
    {
        private readonly Container _container;

        //Verbindung zu CosmosDB
        public NewsRepository(
            string conn,
            string key,
            string databaseName,
            string containerStorageName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerStorageName);
        }

        //News erstellen
        public async Task<News> CreateNews(News news)
        {
            var response = await _container.CreateItemAsync(news, new PartitionKey(news.Id));
            return response.Resource;
        }

        //alle News laden
        public async Task<IEnumerable<News>> GetAll()
        {
            var query = _container.GetItemQueryIterator<News>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<News>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        //eine News laden
        public async Task<News> GetNews(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<News>(query);

            if (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                return response.FirstOrDefault();
            }

            return null;
        }

        //eine News aendern
        public async Task<News> UpdateNews(News news)
        {
            var response = await _container.ReplaceItemAsync(news, news.Id, new PartitionKey(news.Id));
            return response.Resource;
        }

        //eine News loeschen
        public async Task<bool> DeleteNews(string id)
        {
            var response = await _container.DeleteItemAsync<News>(id, new PartitionKey(id));
            if (response != null)
            {
                return true;
            }
            return false;
        }

    }
}
