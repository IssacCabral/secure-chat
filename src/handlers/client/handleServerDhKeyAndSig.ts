import * as net from "net";
import fs from "node:fs";

import { Message, MessageType } from "@utils/message";
import { ECDSA_verify } from "@crypto/ecdsa";
import {
  dhClientSession,
  setSharedSecretClientSession,
  sharedSecretClientSession,
} from "@session/clientSession";
import { PBKDF2 } from "@crypto/kdf";
import {
  KdfParams,
  length_AES_key,
  length_HMAC_key,
} from "@utils/publicParams";
import { encryptAES, generateRandomIV } from "@crypto/aes";
import { calculateHMAC } from "@crypto/hmac";

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
  sendSecureMessage(socket);
}

function derivateKeys() {
  const S = sharedSecretClientSession.toString("base64");
  const KEY_AES = PBKDF2(
    S,
    KdfParams.SALT,
    KdfParams.ITERATIONS,
    length_AES_key
  );
  const KEY_HMAC = PBKDF2(
    S,
    KdfParams.SALT,
    KdfParams.ITERATIONS,
    length_HMAC_key
  );
  const IV_AES = generateRandomIV();

  return {
    KEY_AES,
    IV_AES,
    KEY_HMAC,
  };
}

function sendSecureMessage(socket: net.Socket) {
  const { KEY_AES, KEY_HMAC, IV_AES } = derivateKeys();

  const ENCRYPTED_MESSAGE = encryptAES(
    "Os inimigos estão avançando",
    KEY_AES,
    IV_AES
  );
  const HMAC_TAG = calculateHMAC(
    Buffer.from(
      IV_AES.toString("base64") + ENCRYPTED_MESSAGE.toString("base64")
    ),
    KEY_HMAC
  );

  const message: Message = {
    type: MessageType.CLIENT_CONFIRMS_SHARED_SECRET,
    content: {
      HMAC_TAG: HMAC_TAG.toString("base64"),
      IV_AES: IV_AES.toString("base64"),
      ENCRYPTED_MESSAGE: ENCRYPTED_MESSAGE.toString("base64"),
    },
  };
  socket.write(JSON.stringify(message));
}
