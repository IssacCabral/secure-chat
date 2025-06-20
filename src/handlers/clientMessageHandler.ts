import { MessageType } from "../utils/message";
import { handleClientConnected } from "./client/handleClientConnected";

export const clientMessageHandler: Partial<Record<MessageType, any>> = {
  [MessageType.CLIENT__CONNECTED]: handleClientConnected,
};
