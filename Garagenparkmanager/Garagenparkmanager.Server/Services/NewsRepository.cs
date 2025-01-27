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
            string containerNewsName)
        {
            var cosmosClient = new CosmosClient(conn, key, new CosmosClientOptions() { });
            _container = cosmosClient.GetContainer(databaseName, containerNewsName);
        }

        public async Task<IEnumerable<>> GetAll() { }
        public async Task<> CreateNews() { }
        public async Task<bool> DeleteNews() { }
    }
}
