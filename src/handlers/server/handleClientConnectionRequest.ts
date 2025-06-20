import * as net from "net";
import { Message, MessageType } from "@utils/message";

export function handleClientConnectionRequest(
  _clientMessage: Message,
  socket: net.Socket
) {
  const message: Message = {
    type: MessageType.SERVER_ACK_CONNECTION,
    content: "Confirmamos que você se conectou",
  };
  socket.write(JSON.stringify(message));
}
