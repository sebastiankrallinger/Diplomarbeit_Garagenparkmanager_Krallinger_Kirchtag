using Newtonsoft.Json;

//Datenmodell News 
namespace Garagenparkmanager.Server.Models
{
    public class News
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "title")]
        public string? title { get; set; }

        [JsonProperty(PropertyName = "content")]
        public string? content { get; set; }

        [JsonProperty(PropertyName = "timestamp")]
        public DateTime? timestamp { get; set; }

        [JsonProperty(PropertyName = "imageUrl")]
        public string? ImageUrl { get; set; } = string.Empty;
    }
}
