import * as net from "net";
import { Message, MessageType } from "../../utils/message";

export function handleHandshake3(serverMessage: Message, socket: net.Socket) {
  console.log("Mensagem recebida no cliente", serverMessage);
  const message: Message = {
    type: MessageType.HANDSHAKE_3,
    content: "Último passo do handshake foi executado",
  };
  socket.write(JSON.stringify(message));
}
