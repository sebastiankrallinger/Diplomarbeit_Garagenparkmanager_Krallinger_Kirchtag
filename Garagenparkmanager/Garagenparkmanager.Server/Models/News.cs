using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class News
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "titel")]
        public string Titel { get; set; }

        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }
        [JsonProperty(PropertyName = "img")]
        public string Img { get; set; }
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }


    }
}
