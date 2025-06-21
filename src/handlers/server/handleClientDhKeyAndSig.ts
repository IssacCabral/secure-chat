import * as net from "net";
import fs from "node:fs";

import { Message, MessageType } from "@utils/message";
import { ECDSA_sign, ECDSA_verify } from "@crypto/ecdsa";
import { createDiffieHellman } from "@crypto/dh";
import { DhParams, UserName } from "@utils/publicParams";

export function handleClientDhKeyAndSig(
  clientMessage: Message,
  socket: net.Socket
) {
  // todo: buscar do github
  const ecdsaClientPublicKey = fs.readFileSync(
    `${__dirname}/../../keys/client-public.pem`,
    "utf-8"
  );

  const { publicKeyDH, sign, user } = clientMessage.content;
  const isValidSign = ECDSA_verify(
    publicKeyDH + user,
    sign,
    ecdsaClientPublicKey
  );
  if (!isValidSign) {
    throw new Error("Assinatura inválida! Ataque detectado.");
  }

  const dhServer = createDiffieHellman(
    DhParams.PRIME_LENGTH_IN_BITS,
    DhParams.GENERATOR
  );
  const publicKeyServerDH = dhServer.getPublicKey().toString("base64");

  const privateKeyServerEcdsa = fs.readFileSync(
    `${__dirname}/../../keys/server-private.pem`,
    "utf-8"
  );

  const messageToSign = publicKeyServerDH + UserName.SERVER;
  const sign_B = ECDSA_sign(messageToSign, privateKeyServerEcdsa);

  const content = {
    publicKeyDH: publicKeyServerDH, // B
    sign: sign_B,
    user: UserName.SERVER, // username_server
  };

  const sharedSecretServer = dhServer.computeSecret(
    Buffer.from(publicKeyDH, "base64")
  );

  const message: Message = {
    type: MessageType.SERVER_SENDS_DH_KEY_AND_SIGNATURE,
    content,
    session: {
      sharedSecretServer,
    },
  };
  socket.write(JSON.stringify(message));
}
