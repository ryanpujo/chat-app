import { Role } from '../users/entities/User';

export interface UserInfo {
  Fname: string;
  Lname: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt: number;
  modifiedAt: number;
}
