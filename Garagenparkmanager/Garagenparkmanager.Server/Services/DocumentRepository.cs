using Microsoft.Azure.Cosmos;
using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly Container _container;

        //Verbindung zu CosmosDB
        public DocumentRepository(
            string conn,
            string key,
            string databaseName,
            string containerDocumentName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerDocumentName);
        }

        public async Task<string> CreateDocument(string document)
        {
            var item = new { id = Guid.NewGuid().ToString(), document};
            var response = await _container.CreateItemAsync(item, new PartitionKey(item.id));
            return response.ToString();
        }

        public async Task<IEnumerable<string>> GetAll()
        {
            var query = _container.GetItemQueryIterator<dynamic>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<string>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                foreach (var item in response)
                {
                    results.Add(item.document.ToString());
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
                    if (item.document == type)
                    {
                        var id = item.id.ToString();
                        await _container.DeleteItemAsync<dynamic>(id, new PartitionKey(type));
                    }
                }
            }

            return "Erfolgreich gelöscht.";
        }

        public async Task<Models.Storage> GetDocument(string id)
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
        public async Task<string> SaveFileMetadataAsync(Document document)
        {
            var response = await _container.CreateItemAsync(document);
            return response.ToString();
        }
    }
}
