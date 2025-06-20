import { MessageType } from "../utils/message";
import { handleFoo } from "./server/handleFoo";
import { handleHandshake2 } from "./server/handleHandshake2";
import { handleInitServerConnection } from "./server/handleInitServerConnection";

export const serverMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.INIT_SERVER_CONNECTION]: handleInitServerConnection,
  [MessageType.HANDSHAKE_1]: handleHandshake2,
  [MessageType.HANDSHAKE_3]: handleFoo,
};
