import { Left, Right } from '../../utils/either';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

export class UpdateUser {
  constructor(private readonly userService: UserService) {}

  async update(username: string, dto: UpdateUserDto) {
    try {
      const updated = await this.userService.update(username, dto);
      return new Right(updated);
    } catch (error) {
      return new Left(error);
    }
  }
}
