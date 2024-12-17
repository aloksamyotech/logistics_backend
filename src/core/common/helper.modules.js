import bcrypt from "bcrypt";
import { RoundsOfSalt } from "../constant/enum.js";

export class HelperModules {
  async encrypt(value) {
    let saltRounds = RoundsOfSalt.Salt;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
  }

  async decrypt(value, hash) {
    return bcrypt.compareSync(value, hash);
  }
}
