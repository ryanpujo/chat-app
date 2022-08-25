import userService from '../services';
import { DeleteUser } from './delete-user';
import { FindUsers } from './find-users';
import { SaveUser } from './save-user';
import { UpdateUser } from './update-user';
export type UserUseCase = {
  findUsers: FindUsers;
  saveUser: SaveUser;
  updateUser: UpdateUser;
  deleteUser: DeleteUser;
};
const userUseCase: UserUseCase = {
  findUsers: new FindUsers(userService),
  saveUser: new SaveUser(userService),
  updateUser: new UpdateUser(userService),
  deleteUser: new DeleteUser(userService),
};

export default userUseCase;
