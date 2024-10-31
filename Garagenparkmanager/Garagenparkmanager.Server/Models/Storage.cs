using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    //Mietobjekt-Modell
    public class Storage
    {
        [JsonProperty(PropertyName = "storageId")]
        public int StorageId { get; set; } = 0;

        [JsonProperty(PropertyName = "roomSize")]
        public double RoomSize { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "activeContract")]
        public Contract activeContract { get; set; }
    }
}