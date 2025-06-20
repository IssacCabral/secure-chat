import { MessageType } from "../utils/message";
import { handleHandshake1 } from "./client/handleHandshake1";
import { handleHandshake3 } from "./client/handleHandshake3";

export const clientMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.CLIENT__CONNECTED]: handleHandshake1,
  [MessageType.HANDSHAKE_2]: handleHandshake3,
};
