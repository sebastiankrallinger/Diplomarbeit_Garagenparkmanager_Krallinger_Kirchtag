using Newtonsoft.Json;

//Datenmodell der Mietobjekte
namespace Garagenparkmanager.Server.Models
{
    public enum StorageType{
        garage,
        kleinlager,
        buero
    }

    public class Storage
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "roomSize")]
        public double RoomSize { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "booked")]
        public bool Booked { get; set; }

        [JsonProperty(PropertyName = "storagetype")]
        public StorageType Storagetype { get; set; }

        [JsonProperty(PropertyName = "activeContract")]
        public Contract activeContract { get; set; }
    }
}