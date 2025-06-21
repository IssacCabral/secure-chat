import * as net from "net";
import fs from "node:fs";

import { Message, MessageType } from "@utils/message";
import { ECDSA_verify } from "@crypto/ecdsa";
import {
  dhClientSession,
  setSharedSecretClientSession,
} from "@session/clientSession";

export function handleServerDhKeyAndSig(
  serverMessage: Message,
  socket: net.Socket
) {
  // todo: buscar do github
  const ecdsaServerPublicKey = fs.readFileSync(
    `${__dirname}/../../keys/server-public.pem`,
    "utf-8"
  );

  const {
    publicKeyDH: publicKeyServerDH,
    sign: sign_B,
    user: username_server,
  } = serverMessage.content;
  const isValidSign = ECDSA_verify(
    publicKeyServerDH + username_server,
    sign_B,
    ecdsaServerPublicKey
  );
  if (!isValidSign) {
    throw new Error("Assinatura inválida! Ataque detectado.");
  }

  setSharedSecretClientSession(
    dhClientSession.computeSecret(Buffer.from(publicKeyServerDH, "base64"))
  );

  const message: Message = {
    type: MessageType.CLIENT_CONFIRMS_SHARED_SECRET,
    content: "Último passo do handshake foi executado",
  };
  socket.write(JSON.stringify(message));
}
