﻿using Newtonsoft.Json;

namespace Garagenparkmanager.Server.Models
{
    public class RegisterDataAdmin
    {
        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}