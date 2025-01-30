using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class Document
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "file")]
        public string File { get; set; } = string.Empty;
    }
}
