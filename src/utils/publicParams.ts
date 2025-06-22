export enum DhParams {
  PRIME_LENGTH_IN_BITS = 1024,
  GENERATOR = 5,
}

export enum KdfParams {
  SALT = 16,
  ITERATIONS = 100000,
}

export const length_AES_key = 32;
export const length_HMAC_key = 32;

export enum UserName {
  CLIENT = "IssacCabral-client",
  SERVER = "IssacCabral-server",
}
