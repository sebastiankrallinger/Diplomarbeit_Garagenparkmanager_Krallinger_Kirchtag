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

        public async Task<IEnumerable<Document>> GetAll()
        {
            var query = _container.GetItemQueryIterator<Document>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Document>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        public async Task<string> Delete(string id)
        {
            await _container.DeleteItemAsync<dynamic>(id, new PartitionKey(id));
            return "Erfolgreich gelöscht.";
        }


        public async Task<Models.Document> GetDocument(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<Models.Document>(query);

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
