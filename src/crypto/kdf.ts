import { pbkdf2Sync } from "node:crypto";

export function PBKDF2(
  sharedSecret: string,
  salt: Buffer,
  iterations: number,
  length: number
) {
  return pbkdf2Sync(sharedSecret, salt, iterations, length, "sha256");
}
