// 1024 bits
const DH_PRIME_BASE64 = `
2km4Cj9z2jURLPBFqWlaC3fTOssj0RSzUxqSdvQfsguF+JkvrGciw6QbU13rROMiiIYWRBNU3SR4nAvA1fAxSmrgrthPBMeiZ95LbUoTZ6OtDvU8aE8qS2oCfmb5tchSnrydxj+UchAmQP9+b6UNGswYEMU2LV7sCFZpbl3liO0=
`.replace(/\s+/g, "");

interface IDhParams {
  PRIME: Buffer;
  GENERATOR: number;
}

export const DhParams: Readonly<IDhParams> = {
  PRIME: Buffer.from(DH_PRIME_BASE64, "base64"),
  GENERATOR: 5,
};

interface IKdfParams {
  SALT: Buffer;
  ITERATIONS: number;
}

const KDF_SALT_BASE64 = `EA==`.replace(/\s+/g, "");
export const KdfParams: Readonly<IKdfParams> = {
  SALT: Buffer.from(KDF_SALT_BASE64, "base64"),
  ITERATIONS: 100000,
};

export const length_AES_key = 32;
export const length_HMAC_key = 32;

export enum UserName {
  CLIENT = "IssacCabral-client",
  SERVER = "IssacCabral",
}
