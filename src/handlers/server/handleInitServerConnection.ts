import * as net from "net";
import { Message, MessageType } from "../../utils/message";

export function handleInitServerConnection(
  clientMessage: Message,
  socket: net.Socket
) {
  const message: Message = {
    type: MessageType.CLIENT__CONNECTED,
    content: "Confirmamos que você se conectou",
  };
  socket.write(JSON.stringify(message));
}
