// import fs from "node:fs";

// import { createDiffieHellman } from "./crypto/dh";
// import { ECDSA_sign } from "./crypto/ecdsa";
// import { DhParams, UserName } from "./utils/publicParams";

// const dhClient = createDiffieHellman(
//   DhParams.PRIME_LENGTH_IN_BITS,
//   DhParams.GENERATOR
// );

// const publicKeyDH = dhClient.getPublicKey().toString("base64");
// const privateKeyEcdsa = fs.readFileSync(
//   `${__dirname}/keys/client-private.pem`,
//   "utf-8"
// );

// // 1. Cliente assina sua chave pública DH
// const messageToSign = publicKeyDH + UserName.CLIENT;
// const sig_A = ECDSA_sign(messageToSign, privateKeyEcdsa);

// console.log({ sig_A });

// const package_to_send = {
//   publicKeyDH: publicKeyDH, // A
//   sign: sig_A, // sig_A
//   user: UserName.CLIENT, // username_cliente
// };

// console.log({ package_to_send });

import * as net from "net";
import { Message, MessageType } from "../utils/message";
import { clientMessageHandler } from "../handlers/clientMessageHandler";

const serverPort = 7896;
const client = new net.Socket();

client.connect(serverPort, "localhost", () => {
  const message: Message = {
    type: MessageType.CLIENT_REQUESTS_CONNECTION,
  };
  client.write(JSON.stringify(message));
});

client.on("data", (data) => {
  let message: Message;

  try {
    message = JSON.parse(data.toString());
  } catch (err) {
    console.error("Erro ao parsear JSON:", err);
    client.write(JSON.stringify({ error: "Formato inválido" }));
    return;
  }

  if (!message.type || !clientMessageHandler[message.type]) {
    client.write(JSON.stringify({ error: "Tipo de mensagem desconhecido" }));
    return;
  }

  clientMessageHandler[message.type](message, client);
});

client.on("close", () => {
  console.log("Conexão fechada");
});
