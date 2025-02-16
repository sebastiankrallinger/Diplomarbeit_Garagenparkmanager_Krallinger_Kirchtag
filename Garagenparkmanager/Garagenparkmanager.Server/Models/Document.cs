using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class Document
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "filename")]
        public string FileName { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "fileurl")]
        public string FileUrl { get; set; } = string.Empty;
    }
}
