import crypto from "crypto";

const AES_ALGORITHM = "aes-256-cbc";
const IV_LENGTH_IN_BYTES = 16;

export function generateRandomIV(): Buffer {
  return crypto.randomBytes(IV_LENGTH_IN_BYTES);
}

export function encryptAES(plaintext: string, key: Buffer, iv: Buffer): Buffer {
  const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return encrypted;
}

export function decryptAES(
  ciphertext: Buffer,
  key: Buffer,
  iv: Buffer
): string {
  const decipher = crypto.createDecipheriv(AES_ALGORITHM, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
