import { DiffieHellman } from "node:crypto";

export let dhClientSession: DiffieHellman;
export function setDhClientSession(value: DiffieHellman) {
  dhClientSession = value;
}
