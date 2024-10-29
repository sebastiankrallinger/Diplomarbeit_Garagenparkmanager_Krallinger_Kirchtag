using Garagenparkmanager.Server.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.VisualBasic;

namespace Garagenparkmanager.Server.Services
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly Container _container;
        public CustomerRepository(
            string conn,
            string key,
            string databaseName,
            string containerName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }


        public async Task<Customer> CreateCustomer(Customer consumer)
        {
            var response = await _container.CreateItemAsync(consumer, new PartitionKey(consumer.Name));
            return response.Resource;
        }

        public async Task<bool> DeleteCustomer(string id, string name)
        {
            var response = await _container.DeleteItemAsync<Customer>(id, new PartitionKey(name));
            if (response != null)
            {
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Customer>> GetAll()
        {
            var query = _container.GetItemQueryIterator<Customer>(new QueryDefinition("SELECT * FROM c"));

            var results = new List<Customer>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }
    }
}
