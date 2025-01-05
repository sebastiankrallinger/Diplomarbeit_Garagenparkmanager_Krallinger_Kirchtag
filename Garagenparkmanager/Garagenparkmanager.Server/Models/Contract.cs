using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    //Mietvertarg-Modell
    public class Contract
    {
        [JsonProperty(PropertyName = "startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty(PropertyName = "endDate")]
        public DateTime EndDate { get; set; }

        [JsonProperty(PropertyName = "duration")]
        public double Duration { get; set; }

        [JsonProperty(PropertyName = "extraCosts")]
        public double ExtraCosts { get; set; }

        [JsonProperty(PropertyName = "vpi")]
        public double Vpi { get; set; }

        [JsonProperty(PropertyName = "status")]
        public bool Status { get; set; }
    }
}
