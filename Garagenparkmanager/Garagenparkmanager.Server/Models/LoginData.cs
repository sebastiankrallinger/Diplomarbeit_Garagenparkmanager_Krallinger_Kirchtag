﻿using Newtonsoft.Json;

//Datenmodell Login
namespace Garagenparkmanager.Server.Models
{
    public class LoginData
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
