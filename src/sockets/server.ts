import * as net from "net";
import { Message } from "../utils/message";
import { serverMessageHandler } from "../handlers/serverMessageHandler";

const serverPort = 7896;

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    let message: Message;

    try {
      message = JSON.parse(data.toString());
    } catch (err) {
      console.error("Erro ao parsear JSON:", err);
      socket.write(JSON.stringify({ error: "Formato inválido" }));
      return;
    }

    if (!message.type || !serverMessageHandler[message.type]) {
      socket.write(JSON.stringify({ error: "Tipo de mensagem desconhecido" }));
      return;
    }

    serverMessageHandler[message.type](message, socket);
  });

  socket.on("end", () => {
    console.log("Conexão fechada");
  });
});

server.listen(serverPort, () => {
  console.log(`Servidor TCP ouvindo na porta ${serverPort}`);
});
