using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Security.Cryptography;



namespace BK
{
    /// <summary>
    /// <created by> Majid Rostami 10/05/2009</created>
    /// This class is responsible for encoding the password using a seed
    /// </summary>
    public class Encoder
    {
        // iny=terface for creatin  sha256 encoding
        public static string sha256(string password)
        {
            SHA256Managed crypt = new SHA256Managed();
            string hash = String.Empty;
            byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(password), 0, Encoding.ASCII.GetByteCount(password));
            foreach (byte bit in crypto)
            {
                hash += bit.ToString("x2");
            }
            return hash;
        }


        /// <summary>
        /// XOR every byte in data with the specified byte
        /// </summary>
        /// <param name="data">the data to XOR</param>
        /// <param name="xor">the byte to XOR with</param>

        /// <returns>the XORed byte array</returns>
        public static byte[] xor(byte[] data, byte xor)
        {
            byte[] buffer = new Byte[data.Length];

            for (int i = 0; i < data.Length; i++)
                buffer[i] = Convert.ToByte(Convert.ToInt32(data[i]) ^ Convert.ToInt32(xor));

            return buffer;
        }

        /// <summary>
        /// This function creates the proper HMAC-SHA256 response
        /// </summary>
        /// <param name="password">the password</param>
        /// <param name="challenge">the challenge</param >
        /// <returns>the hmac-sha256 response to send to InspIRCd</returns>

        public static string hmac(string password, string challenge)
        {
            byte[] pass = Encoding.ASCII.GetBytes(password);
            string xor1 = Encoding.ASCII.GetString(xor(pass, (byte)0x5C));
            string xor2 = Encoding.ASCII.GetString(xor(pass, (byte)0x36));
            //string sha2 = sha256(xor2 + challenge);
            string sha1 = sha256(xor1 + challenge);
            return sha1;
        }

    }

}