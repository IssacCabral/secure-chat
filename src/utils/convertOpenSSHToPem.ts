import sshpk from "sshpk";

export function convertOpenSSHToPEM(opensshKey: string): string {
  const key = sshpk.parseKey(opensshKey, "ssh");
  return key.toString("pem");
}
