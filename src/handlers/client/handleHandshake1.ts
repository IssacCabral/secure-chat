import * as net from "net";
import { Message, MessageType } from "../../utils/message";

export function handleHandshake1(serverMessage: Message, socket: net.Socket) {
  console.log("Mensagem recebida no cliente", serverMessage);
  const message: Message = {
    type: MessageType.HANDSHAKE_1,
    content: "enviando chave assinada do client",
  };
  socket.write(JSON.stringify(message));
}
