import fs from "node:fs";

import { createDiffieHellman } from "./crypto/dh";
import { ECDSA_sign } from "./crypto/ecdsa";
import { DhParams, UserName } from "./utils/publicParams";

const dhClient = createDiffieHellman(
  DhParams.PRIME_LENGTH_IN_BITS,
  DhParams.GENERATOR
);

const publicKeyDH = dhClient.getPublicKey().toString("base64");
const privateKeyEcdsa = fs.readFileSync(
  `${__dirname}/keys/client-private.pem`,
  "utf-8"
);

// 1. Cliente assina sua chave pública DH
const messageToSign = publicKeyDH + UserName.CLIENT;
const sig_A = ECDSA_sign(messageToSign, privateKeyEcdsa);

console.log({ sig_A });

const package_to_send = {
  publicKeyDH: publicKeyDH, // A
  sign: sig_A, // sig_A
  user: UserName.CLIENT, // username_cliente
};

console.log({ package_to_send });
