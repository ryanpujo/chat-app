import { Repository } from 'typeorm';
import { BadRequest, NotFound } from '../../error/error.type';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/User';

export class UserService {
  constructor(private readonly userRepo: Repository<User>) {}

  async saveUser(user: CreateUserDto): Promise<User> {
    const existingEmail = this.userRepo.findOne({
      where: { email: user.email },
    });
    const existingUsername = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if ((await existingEmail) || (await existingUsername)) {
      throw new BadRequest('either email or username had been used');
    }
    const entity = new User();
    entity.fname = user.fname;
    entity.lname = user.lname;
    entity.username = user.username;
    entity.email = user.email;
    entity.password = user.password;
    entity.roles = user.roles;
    const newUser = await this.userRepo.save(entity);
    return newUser;
  }

  async findUsers(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (user == null) {
      throw new NotFound(`user not found by username: ${username}`);
    }
    return user;
  }

  async update(username: string, updateDto: UpdateUserDto) {
    updateDto.username = username;
    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser == null) {
      throw new BadRequest('user does not exist');
    }
    const result = await this.userRepo.save(updateDto);
    return result;
  }

  async deleteUser(username: string) {
    await this.userRepo.delete({ username });
  }
}
