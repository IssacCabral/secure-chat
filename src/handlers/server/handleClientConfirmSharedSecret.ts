import * as net from "net";
import { Message } from "@utils/message";
import { PBKDF2 } from "@crypto/kdf";
import { sharedSecretServerSession } from "@session/serverSession";
import {
  KdfParams,
  length_AES_key,
  length_HMAC_key,
} from "@utils/publicParams";
import { calculateHMAC } from "@crypto/hmac";
import { decryptAES } from "@crypto/aes";

export function handleClientConfirmSharedSecret(
  clientMessage: Message,
  _socket: net.Socket
) {
  const {
    HMAC_TAG: CLIENT_HMAC_TAG,
    IV_AES,
    ENCRYPTED_MESSAGE,
  } = clientMessage.content;

  const { KEY_AES, KEY_HMAC } = derivateKeys();

  const SERVER_HMAC_TAG = calculateHMAC(
    Buffer.from(IV_AES + ENCRYPTED_MESSAGE),
    KEY_HMAC
  );

  const SERVER_HMAC_TAG_TO_STRING = SERVER_HMAC_TAG.toString("base64");

  // verificar Integridade e Autenticidade
  if (CLIENT_HMAC_TAG !== SERVER_HMAC_TAG_TO_STRING) {
    throw new Error("Mensagem Rejeitada!");
  }

  const DECRYPTED_MESSAGE = decryptAES(
    Buffer.from(ENCRYPTED_MESSAGE, "base64"),
    KEY_AES,
    Buffer.from(IV_AES, "base64")
  );

  console.log({ DECRYPTED_MESSAGE });
}

function derivateKeys() {
  const S = sharedSecretServerSession.toString("base64");
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

  return {
    KEY_AES,
    KEY_HMAC,
  };
}
