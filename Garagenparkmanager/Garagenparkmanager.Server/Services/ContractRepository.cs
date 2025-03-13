using Microsoft.Azure.Cosmos;
using Garagenparkmanager.Server.Models;

namespace Garagenparkmanager.Server.Services
{
    public class ContractRepository : IContractRepository
    {
        private readonly Container _container;

        //Verbindung zu CosmosDB
        public ContractRepository(
            string conn,
            string key,
            string databaseName,
            string containerContractName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerContractName);
        }

        //Vertrag hinzufügen
        public async Task<string> CreateContract(string contract)
        {
            var item = new { id = Guid.NewGuid().ToString(), contract };
            var response = await _container.CreateItemAsync(item, new PartitionKey(item.id));
            return response.ToString();
        }

        //alle Verträge laden
        public async Task<IEnumerable<Contract>> GetAll()
        {
            var query = _container.GetItemQueryIterator<Contract>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Contract>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        //Vertrag löschen
        public async Task<string> Delete(string id)
        {
            await _container.DeleteItemAsync<dynamic>(id, new PartitionKey(id));
            return "Erfolgreich gelöscht.";
        }

        //einen Vertrag laden
        public async Task<Models.Contract> GetContract(string id)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                .WithParameter("@id", id);

            var iterator = _container.GetItemQueryIterator<Models.Contract>(query);

            if (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                return response.FirstOrDefault();
            }

            return null;
        }

        //URL und Filename in DB speichern
        public async Task<string> SaveFileMetadataAsync(Document contract)
        {
            var response = await _container.CreateItemAsync(contract);
            return response.ToString();
        }
    }
}
