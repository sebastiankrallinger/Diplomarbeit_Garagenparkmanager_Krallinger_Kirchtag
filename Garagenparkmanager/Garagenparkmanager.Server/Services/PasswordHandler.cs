using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Garagenparkmanager.Server.Services
{
    public class PasswordHandler
    {
        public (string hashedPassword, string salt) HashPassword(string enteredPassword)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(16);

            string passwordHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return (passwordHashed, Convert.ToBase64String(salt));
        }

        public bool ValidatePassword(string enteredPassword, string storedHash, string storedSalt)
        {
            byte[] salt = Convert.FromBase64String(storedSalt);

            string enteredHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return storedHash == enteredHash;
        }
    }
}
