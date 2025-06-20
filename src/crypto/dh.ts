import { createDiffieHellman as createDh, DiffieHellman } from "node:crypto";

export function createDiffieHellman(
  prime: number,
  generator: number
): DiffieHellman {
  const dh = createDh(prime, generator);
  dh.generateKeys();
  return dh;
}

// // Generate Alice's Key
// const alice = createDiffieHellman(
//   PublicParams.PRIME_LENGTH_IN_BITS,
//   PublicParams.GENERATOR
// );
// const aliceKey = alice.generateKeys();

// // Generate Bob's keys...
// const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobKey = bob.generateKeys();

// // Exchange and generate the secret...
// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// console.log({ aliceSecret: aliceSecret.toString("hex") });
// console.log({ bobSecret: bobSecret.toString("hex") });
