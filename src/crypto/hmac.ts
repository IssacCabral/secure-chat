import crypto from "crypto";

export function calculateHMAC(
  message: Buffer,
  key: Buffer,
  algorithm = "sha256"
): Buffer {
  return crypto.createHmac(algorithm, key).update(message).digest();
}
