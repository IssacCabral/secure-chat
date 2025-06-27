import * as net from "net";
import fs from "node:fs";

import { Message, MessageType } from "@utils/message";
import { ECDSA_sign, ECDSA_verify } from "@crypto/ecdsa";
import { createDiffieHellman } from "@crypto/dh";
import { DhParams, UserName } from "@utils/publicParams";
import { setSharedSecretServerSession } from "@session/serverSession";

export async function handleClientDhKeyAndSig(
  clientMessage: Message,
  socket: net.Socket
) {
  // todo: buscar do github
  const response = await fetch("https://github.com/issaccabral.keys");
  if (!response.ok) {
    throw new Error(`Erro ao buscar chaves: ${response.status}`);
  }

  const keysText = await response.text();
  const keys = keysText.split("\n");

  console.log({ key: keys[3] });

  const ecdsaClientPublicKey = fs.readFileSync(
    `${__dirname}/../../keys/old/client-public.pem`,
    "utf-8"
  );

  const {
    publicKeyDH: publicKeyClientDH,
    sign: sign_A,
    user: username_client,
  } = clientMessage.content;
  const isValidSign = ECDSA_verify(
    publicKeyClientDH + username_client,
    sign_A,
    ecdsaClientPublicKey
  );
  if (!isValidSign) {
    throw new Error("Assinatura inválida! Ataque detectado.");
  }

  const dhServer = createDiffieHellman(DhParams.PRIME, DhParams.GENERATOR);
  const publicKeyServerDH = dhServer.getPublicKey().toString("base64");

  const privateKeyServerEcdsa = fs.readFileSync(
    `${__dirname}/../../keys/old/server-private.pem`,
    "utf-8"
  );

  const messageToSign = publicKeyServerDH + UserName.SERVER;
  const sign_B = ECDSA_sign(messageToSign, privateKeyServerEcdsa);

  const content = {
    publicKeyDH: publicKeyServerDH, // B
    sign: sign_B,
    user: UserName.SERVER, // username_server
  };

  setSharedSecretServerSession(
    dhServer.computeSecret(Buffer.from(publicKeyClientDH, "base64"))
  );

  const message: Message = {
    type: MessageType.SERVER_SENDS_DH_KEY_AND_SIGNATURE,
    content,
  };
  socket.write(JSON.stringify(message));
}
