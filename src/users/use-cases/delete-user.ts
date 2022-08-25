import { UserService } from '../services/user.service';

export class DeleteUser {
  constructor(private readonly userService: UserService) {}

  async delete(username: string) {
    await this.userService.deleteUser(username);
  }
}
