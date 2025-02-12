using Newtonsoft.Json;

//Datenmodell fuer die Erstellung eines Mietobjekts
namespace Garagenparkmanager.Server.Models
{
    public class NewStorage
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "roomSize")]
        public double RoomSize { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "booked")]
        public bool Booked { get; set; }

        [JsonProperty(PropertyName = "storagetype")]
        public string Storagetype { get; set; }
    }
}
