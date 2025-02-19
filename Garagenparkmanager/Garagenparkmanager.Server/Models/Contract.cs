using Newtonsoft.Json;

//Datenmodell Mietvertrag
namespace Garagenparkmanager.Server.Models
{
    public class Contract
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "extraCosts")]
        public double? ExtraCosts { get; set; }

        [JsonProperty(PropertyName = "VPIold")]
        public double? VPIold { get; set; }

        [JsonProperty(PropertyName = "status")]
        public bool? Status { get; set; }

        [JsonProperty(PropertyName = "startDate")]
        public DateTime? StartDate { get; set; }

        [JsonProperty(PropertyName = "endDate")]
        public DateTime? EndDate { get; set; }

        [JsonProperty(PropertyName = "duration")]
        public int? Duration { get; set; }
        [JsonProperty(PropertyName = "filename")]
        public string FileName { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "fileurl")]
        public string FileUrl { get; set; } = string.Empty;

    }
}

