import * as net from "net";
import { Message } from "@utils/message";

export function handleClientConfirmSharedSecret(
  clientMessage: Message,
  socket: net.Socket
) {
  console.log("Handshake estabelecido com sucesso!");
  console.log("Mensagem recebida no servidor:", clientMessage);
  // const message: Message = {
  //   type: MessageType.HANDSHAKE_2,
  //   content: "Enviando chave assinada do server",
  // };
  // socket.write(JSON.stringify(message));
}
