using Newtonsoft.Json;

//Datenmodell Mietvertrag
namespace Garagenparkmanager.Server.Models
{
    public class Contract
    {

        [JsonProperty(PropertyName = "extraCosts")]
        public double ExtraCosts { get; set; }

        [JsonProperty(PropertyName = "vpiOld")]
        public double VPIold { get; set; }

        [JsonProperty(PropertyName = "status")]
        public bool Status { get; set; }
    }
}
