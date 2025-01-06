using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    //Mietvertrag-Modell
    public class Contract
    {

        [JsonProperty(PropertyName = "extraCosts")]
        public double ExtraCosts { get; set; }

        [JsonProperty(PropertyName = "VPIold")]
        public double VPIold { get; set; }

        [JsonProperty(PropertyName = "status")]
        public bool Status { get; set; }
    }
}
