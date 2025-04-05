import { AES, enc } from "crypto-js";

export class EncryptService {
  generateHash = (password: string): string => {
    const hash = AES.encrypt(password, process.env.SECRET_KEY as string);

    return hash.toString();
  };

  decryptHash = (hash: string): string => {
    const decrypted = AES.decrypt(hash, process.env.SECRET_KEY as string);

    return decrypted.toString(enc.Utf8);
  };
}
