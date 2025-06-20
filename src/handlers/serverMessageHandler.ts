import { MessageType } from "../utils/message";
import { handleInitServerConnection } from "./server/handleInitServerConnection";

export const serverMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.INIT_SERVER_CONNECTION]: handleInitServerConnection,
};
