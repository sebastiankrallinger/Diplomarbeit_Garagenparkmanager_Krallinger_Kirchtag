﻿using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class AdminData
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; } = string.Empty;
        [JsonProperty(PropertyName = "role")]
        public Role Role { get; set; }
        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        [JsonProperty(PropertyName = "salt")]
        public string Salt { get; set; }
    }
}