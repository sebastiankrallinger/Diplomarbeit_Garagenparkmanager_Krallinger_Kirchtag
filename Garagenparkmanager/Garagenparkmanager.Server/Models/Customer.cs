using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class Customer
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; } = 0;

        [JsonProperty(PropertyName = "firstname")]
        public string Firstname { get; set; }

        [JsonProperty(PropertyName = "lastname")]
        public string Lastname { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "storages")]
        public List<Storage> Storages { get; set; }
    }
}
