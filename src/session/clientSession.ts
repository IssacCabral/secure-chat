import { DiffieHellman } from "node:crypto";

export let dhClientSession: DiffieHellman;
export function setDhClientSession(value: DiffieHellman) {
  dhClientSession = value;
}

export let sharedSecretClientSession: Buffer;
export function setSharedSecretClientSession(value: Buffer): void {
  sharedSecretClientSession = value;
}
