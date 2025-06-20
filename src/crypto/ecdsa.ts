import { createSign, createVerify } from "node:crypto";

export function ECDSA_sign(message: string, privateKey: string): string {
  const sign = createSign("sha256");
  sign.update(message);
  sign.end();
  return sign.sign(privateKey, "hex");
}

export function ECDSA_verify(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  const verify = createVerify("sha256");
  verify.update(message);
  verify.end();
  return verify.verify(publicKey, signature, "hex");
}
