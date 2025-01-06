using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class NewStorage
    {

        [JsonProperty(PropertyName = "roomSize")]
        public double RoomSize { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "booked")]
        public bool Booked { get; set; }

        [JsonProperty(PropertyName = "storagetype")]
        public StorageType Storagetype { get; set; }
    }
}
