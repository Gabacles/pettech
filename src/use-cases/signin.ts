import { IUserRepository } from "@/repositories/user.repository.interface";
import { invalidCredentialsError } from "./errors/invalid-credentials-error";

export class SigninUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(username: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new invalidCredentialsError();
    }

    return user;
  }
}
