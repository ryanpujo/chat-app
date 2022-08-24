import { GeneralError } from '../../error/error.type';
import { Either, Left, Right } from '../../utils/either';
import { User } from '../entities/User';
import { UserService } from '../services/user.service';

export class SaveUser {
  constructor(private readonly userService: UserService) {}

  async save(user: User): Promise<Either<GeneralError, User>> {
    try {
      const newUser = await this.userService.saveUser(user);
      return new Right(newUser);
    } catch (error) {
      return new Left(error as GeneralError);
    }
  }
}
