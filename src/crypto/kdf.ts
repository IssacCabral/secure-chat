import { pbkdf2Sync, randomBytes } from "node:crypto";

export function PBKDF2(
  sharedSecret: string,
  salt: number,
  iterations: number,
  length: number
) {
  return pbkdf2Sync(
    sharedSecret,
    randomBytes(salt),
    iterations,
    length,
    "sha256"
  );
}
