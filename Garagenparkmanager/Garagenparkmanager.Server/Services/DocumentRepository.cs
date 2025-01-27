using Microsoft.Azure.Cosmos;

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

        public async Task<string> CreateDocument(string type)
        {
            var item = new { id = Guid.NewGuid().ToString(), storagetype = type };
            var response = await _container.CreateItemAsync(item, new PartitionKey(type));
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
