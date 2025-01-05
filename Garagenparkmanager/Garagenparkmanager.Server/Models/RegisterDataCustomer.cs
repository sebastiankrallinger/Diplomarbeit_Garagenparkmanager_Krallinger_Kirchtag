using Newtonsoft.Json;

//Datenmodell Kundenregistrierung
namespace Garagenparkmanager.Server.Models
{
    public class RegisterDataCustomer
    {
        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Birthdate { get; set; }

        public string Plz { get; set; }

        public string Location { get; set; }

        public string Street { get; set; }

        public string Housenumber { get; set; }

        public string HousenumberAddition { get; set; }

        public string Email { get; set; }

        public string CompanyName { get; set; }

        public string AtuNumber { get; set; }

        public string Password { get; set; }
    }
}
