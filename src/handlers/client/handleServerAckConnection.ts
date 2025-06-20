import * as net from "net";
import { Message, MessageType } from "../../utils/message";

export function handleServerAckConnection(
  serverMessage: Message,
  socket: net.Socket
) {
  console.log("Mensagem recebida no cliente", serverMessage);
  const message: Message = {
    type: MessageType.CLIENT_SENDS_DH_KEY_AND_SIGNATURE,
    content: "enviando chave assinada do client",
  };
  socket.write(JSON.stringify(message));
}
