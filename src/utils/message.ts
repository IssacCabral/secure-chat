export enum MessageType {
  INIT_SERVER_CONNECTION = "init_server_connection",
  CLIENT__CONNECTED = "client_connected",
}

export interface Message {
  type: MessageType;
  content?: any;
}
