import * as net from "net";
import fs from "node:fs";

import { DhParams, UserName } from "@utils/publicParams";
import { createDiffieHellman } from "@crypto/dh";
import { ECDSA_sign } from "@crypto/ecdsa";
import { Message, MessageType } from "@utils/message";
import { setDhClientSession } from "src/session/clientSession";

export function handleServerAckConnection(
  _serverMessage: Message,
  socket: net.Socket
) {
  const dhClient = createDiffieHellman(
    DhParams.PRIME_LENGTH_IN_BITS,
    DhParams.GENERATOR
  );
  const publicKeyDH = dhClient.getPublicKey().toString("base64");
  setDhClientSession(dhClient);

  const privateKeyEcdsa = fs.readFileSync(
    `${__dirname}/../../keys/client-private.pem`,
    "utf-8"
  );

  const messageToSign = publicKeyDH + UserName.CLIENT;
  const sig_A = ECDSA_sign(messageToSign, privateKeyEcdsa);

  const content = {
    publicKeyDH: publicKeyDH, // A
    sign: sig_A,
    user: UserName.CLIENT, // username_cliente
  };

  const message: Message = {
    type: MessageType.CLIENT_SENDS_DH_KEY_AND_SIGNATURE,
    content,
  };

  socket.write(JSON.stringify(message));
}
