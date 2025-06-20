import { clientMessageHandler } from "@handlers/clientMessageHandler";
import { Message, MessageType } from "@utils/message";
import * as net from "net";

const serverPort = 7896;
const client = new net.Socket();

client.connect(serverPort, "localhost", () => {
  const message: Message = {
    type: MessageType.CLIENT_REQUESTS_CONNECTION,
  };
  client.write(JSON.stringify(message));
});

client.on("data", (data) => {
  let message: Message;

  try {
    message = JSON.parse(data.toString());
  } catch (err) {
    console.error("Erro ao parsear JSON:", err);
    client.write(JSON.stringify({ error: "Formato inválido" }));
    return;
  }

  if (!message.type || !clientMessageHandler[message.type]) {
    client.write(JSON.stringify({ error: "Tipo de mensagem desconhecido" }));
    return;
  }

  clientMessageHandler[message.type](message, client);
});

client.on("close", () => {
  console.log("Conexão fechada");
});
