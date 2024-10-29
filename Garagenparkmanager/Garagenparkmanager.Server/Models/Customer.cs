using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class Customer
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
