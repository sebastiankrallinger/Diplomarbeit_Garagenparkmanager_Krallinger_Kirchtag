﻿namespace Garagenparkmanager.Server.Models
{
    public class LoginResponse
    {
        public string? Email { get; set; }
        public string? Accesstoken { get; set; }
        public int ExpiresIn { get; set; }
    }
}