import { CreateUserDto } from '../dtos/create-user.dto';
import { UserUseCase } from '../use-cases';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async saveUser(userDto: CreateUserDto) {
    const result = await this.userUseCase.saveUser.save(userDto);
    return result;
  }
}
