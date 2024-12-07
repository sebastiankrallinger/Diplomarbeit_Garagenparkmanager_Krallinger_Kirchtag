using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    //Kunden-Modell
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "firstname")]
        public string Firstname { get; set; }

        [JsonProperty(PropertyName = "lastname")]
        public string Lastname { get; set; }

        [JsonProperty(PropertyName = "birthdate")]
        public DateTime birthdate { get; set; }

        [JsonProperty(PropertyName = "plz")]
        public string plz { get; set; }

        [JsonProperty(PropertyName = "location")]
        public string location { get; set; }

        [JsonProperty(PropertyName = "street")]
        public string street { get; set; }

        [JsonProperty(PropertyName = "housenumber")]
        public int housenumber { get; set; }

        [JsonProperty(PropertyName = "housenumberAddition")]
        public string housenumberAddition { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "companyName")]
        public string CompanyName { get; set; }

        [JsonProperty(PropertyName = "atuNumber")]
        public string AtuNumber { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "storages")]
        public List<Storage> Storages { get; set; }

        [JsonProperty(PropertyName = "contracts")]
        public List<Contract> Contracts { get; set; }
    }
}
