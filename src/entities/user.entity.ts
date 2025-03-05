import { IUser } from "./models/user.interface";

export class User implements IUser {
  id?: number;
  username: string;
  password: string;

  constructor(name: string, password: string) {
    this.username = name;
    this.password = password;
  }
}
