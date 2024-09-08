import { compare, genSalt, hash } from "bcrypt";
import { HashProvider } from "../interface/hash.provider";

export class BcryptProvider implements HashProvider {

  async hash(payload: string, salt?: number): Promise<string> {
    const saltRounds = salt || 10;
    const saltGenerated = await genSalt(saltRounds);
    return hash(payload, saltGenerated);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

}