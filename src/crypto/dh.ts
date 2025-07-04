import { createDiffieHellman as createDh, DiffieHellman } from "node:crypto";

export function createDiffieHellman(
  prime: Buffer,
  generator: number
): DiffieHellman {
  const dh = createDh(prime, generator);
  dh.generateKeys();
  return dh;
}
