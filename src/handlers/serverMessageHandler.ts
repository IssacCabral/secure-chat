import { MessageType } from "@utils/message";
import { handleClientConnectionRequest } from "./server/handleClientConnectionRequest";
import { handleClientDhKeyAndSig } from "./server/handleClientDhKeyAndSig";
import { handleClientConfirmSharedSecret } from "./server/handleClientConfirmSharedSecret";

export const serverMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.CLIENT_REQUESTS_CONNECTION]: handleClientConnectionRequest,
  [MessageType.CLIENT_SENDS_DH_KEY_AND_SIGNATURE]: handleClientDhKeyAndSig,
  [MessageType.CLIENT_CONFIRMS_SHARED_SECRET]: handleClientConfirmSharedSecret,
};
