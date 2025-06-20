import { MessageType } from "@utils/message";
import { handleServerAckConnection } from "./client/handleServerAckConnection";
import { handleServerDhKeyAndSig } from "./client/handleServerDhKeyAndSig";

export const clientMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.SERVER_ACK_CONNECTION]: handleServerAckConnection,
  [MessageType.SERVER_SENDS_DH_KEY_AND_SIGNATURE]: handleServerDhKeyAndSig,
};
