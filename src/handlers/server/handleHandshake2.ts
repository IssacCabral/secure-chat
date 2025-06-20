import * as net from "net";
import { Message, MessageType } from "../../utils/message";

export function handleHandshake2(clientMessage: Message, socket: net.Socket) {
  console.log("Mensagem recebida no servidor:", clientMessage);
  const message: Message = {
    type: MessageType.HANDSHAKE_2,
    content: "Enviando chave assinada do server",
  };
  socket.write(JSON.stringify(message));
}
