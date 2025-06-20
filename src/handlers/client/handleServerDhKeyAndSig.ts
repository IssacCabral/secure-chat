import * as net from "net";
import { Message, MessageType } from "@utils/message";

export function handleServerDhKeyAndSig(
  serverMessage: Message,
  socket: net.Socket
) {
  console.log("Mensagem recebida no cliente", serverMessage);
  const message: Message = {
    type: MessageType.CLIENT_CONFIRMS_SHARED_SECRET,
    content: "Último passo do handshake foi executado",
  };
  socket.write(JSON.stringify(message));
}
