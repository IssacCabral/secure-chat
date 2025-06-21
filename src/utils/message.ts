export enum MessageType {
  CLIENT_REQUESTS_CONNECTION = "client_requests_connection",
  SERVER_ACK_CONNECTION = "server_acknowledging_connection",

  CLIENT_SENDS_DH_KEY_AND_SIGNATURE = "client_sends_dh_key_and_signature",
  SERVER_SENDS_DH_KEY_AND_SIGNATURE = "server_sends_dh_key_and_signature",

  CLIENT_CONFIRMS_SHARED_SECRET = "client_confirms_shared_secret",
}

export interface Message {
  type: MessageType;
  content?: any;
  session?: {
    sharedSecretServer?: Buffer;
    sharedSecretClient?: string;
  };
}
