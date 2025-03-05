import { IPerson } from "./models/person.interface";

export class Person implements IPerson {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  birth: Date;
  user_id?: number;

  constructor(
    name: string,
    cpf: string,
    email: string,
    birth: Date,
  ) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.birth = birth;
  }
}
