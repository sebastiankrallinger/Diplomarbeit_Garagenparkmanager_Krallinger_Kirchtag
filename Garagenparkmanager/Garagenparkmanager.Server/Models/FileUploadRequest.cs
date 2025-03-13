using Newtonsoft.Json;

//Datenmodell Upload File Blob Storage
namespace Garagenparkmanager.Server.Models
{
    public class FileUploadRequest
    {
        [JsonProperty(PropertyName = "file")]
        public string File { get; set; }
        [JsonProperty(PropertyName = "fileName")]
        public string FileName { get; set; }
    }
}
