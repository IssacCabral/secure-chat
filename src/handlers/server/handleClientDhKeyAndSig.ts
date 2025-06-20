import * as net from "net";
import { Message, MessageType } from "@utils/message";

export function handleClientDhKeyAndSig(
  clientMessage: Message,
  socket: net.Socket
) {
  console.log("Mensagem recebida no servidor:", clientMessage);
  const message: Message = {
    type: MessageType.SERVER_SENDS_DH_KEY_AND_SIGNATURE,
    content: "Enviando chave assinada do server",
  };
  socket.write(JSON.stringify(message));
}
