export enum MessageType {
  INIT_SERVER_CONNECTION = "init_server_connection",
  CLIENT__CONNECTED = "client_connected",
  HANDSHAKE_1 = "handshake_1",
  HANDSHAKE_2 = "handshake_2",
  HANDSHAKE_3 = "handshake_3",
}

export interface Message {
  type: MessageType;
  content?: any;
}
