export interface UserInfo {
  id: number;
  Fname: string;
  Lname: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt: number;
  modifiedAt: number;
}

export enum Role {
  ADMIN,
  USER,
}
