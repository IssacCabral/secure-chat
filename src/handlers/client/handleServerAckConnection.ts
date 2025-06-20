import * as net from "net";
import fs from "node:fs";

import { DhParams, UserName } from "@utils/publicParams";
import { createDiffieHellman } from "@crypto/dh";
import { ECDSA_sign } from "@crypto/ecdsa";
import { Message, MessageType } from "@utils/message";

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

export function handleServerAckConnection(
  serverMessage: Message,
  socket: net.Socket
) {
  console.log("Mensagem recebida no cliente", serverMessage);

  const message: Message = {
    type: MessageType.CLIENT_SENDS_DH_KEY_AND_SIGNATURE,
    content: "enviando chave assinada do client",
  };
  socket.write(JSON.stringify(message));
}
