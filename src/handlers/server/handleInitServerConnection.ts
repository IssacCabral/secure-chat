import { Message, MessageType } from "../../utils/message";

export function handleInitServerConnection(message, socket) {
  const responseMessage: Message = {
    type: MessageType.CLIENT__CONNECTED,
    content: "Confirmamos que você se conectou",
  };
  socket.write(JSON.stringify(responseMessage));
}
