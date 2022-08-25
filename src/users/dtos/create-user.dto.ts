import { Role } from '../entities/User';

export class CreateUserDto {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  createdat: number;
  modifiedat: number;
}
