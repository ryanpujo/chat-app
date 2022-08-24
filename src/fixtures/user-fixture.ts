import { Role, User } from '../users/entities/User';

export function makeUser() {
  const info = {
    Fname: 'ryan',
    Lname: 'pujo',
    username: 'ryanpujo',
    email: 'ryabpujo@yahoo.co.id',
    password: '1234567890',
    roles: [Role.ADMIN],
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
  const user = new User();
  user.fname = info.Fname;
  user.lname = info.Lname;
  user.username = info.username;
  user.email = info.email;
  user.password = info.password;
  user.roles = info.roles;
  user.createdat = info.createdAt;
  user.modifiedat = info.modifiedAt;
  return user;
}
