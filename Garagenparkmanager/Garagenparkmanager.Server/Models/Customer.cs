using Newtonsoft.Json;

//Datenmodell Kunde
namespace Garagenparkmanager.Server.Models
{
    public enum Role
    {
        superadmin,
        admin,
        user
    }

    //Kunden-Modell
    public class Customer
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "role")]
        public Role Role { get; set; }

        [JsonProperty(PropertyName = "firstname")]
        public string Firstname { get; set; }

        [JsonProperty(PropertyName = "lastname")]
        public string Lastname { get; set; }

        [JsonProperty(PropertyName = "birthdate")]
        public DateTime Birthdate { get; set; }

        [JsonProperty(PropertyName = "plz")]
        public string Plz { get; set; }

        [JsonProperty(PropertyName = "location")]
        public string Location { get; set; }

        [JsonProperty(PropertyName = "street")]
        public string Street { get; set; }

        [JsonProperty(PropertyName = "housenumber")]
        public int Housenumber { get; set; }

        [JsonProperty(PropertyName = "housenumberAddition")]
        public string HousenumberAddition { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "companyName")]
        public string CompanyName { get; set; }

        [JsonProperty(PropertyName = "atuNumber")]
        public string AtuNumber { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
        [JsonProperty(PropertyName = "salt")]
        public string Salt { get; set; }

        [JsonProperty(PropertyName = "storages")]
        public List<Storage> Storages { get; set; }

        [JsonProperty(PropertyName = "contracts")]
        public List<Contract> Contracts { get; set; }
    }
}
