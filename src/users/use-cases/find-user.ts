import { Left, Right } from '../../utils/either';
import { UserService } from '../services/user.service';

export class FindUser {
  constructor(private readonly userService: UserService) {}

  async FindByUsername(username: string) {
    try {
      const user = await this.userService.findByUsername(username);
      return new Right(user);
    } catch (error) {
      return new Left(error);
    }
  }
}
