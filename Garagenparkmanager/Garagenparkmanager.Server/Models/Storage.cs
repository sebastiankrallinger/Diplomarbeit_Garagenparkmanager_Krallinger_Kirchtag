using Newtonsoft.Json;

//Datenmodell der Mietobjekte
namespace Garagenparkmanager.Server.Models
{
    public class Storage
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "roomSize")]
        public double RoomSize { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "booked")]
        public bool Booked { get; set; }

        [JsonProperty(PropertyName = "activeContract")]
        public Contract activeContract { get; set; }
    }
}