import { Left, Right } from '../../utils/either';
import { UserService } from '../services/user.service';

export class FindUsers {
  constructor(private readonly userService: UserService) {}

  async find() {
    try {
      const users = await this.userService.findUsers();
      return new Right(users);
    } catch (error) {
      return new Left(error);
    }
  }
}
