import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { UserService } from '../services/user.service';
import { DeleteUser } from './delete-user';

describe('delete case of user use case', () => {
  let userService: UserService;
  let deleteUser: DeleteUser;

  beforeEach(async () => {
    userService = mock(UserService);
    deleteUser = new DeleteUser(instance(userService));
  });
  it('delet user', async () => {
    await deleteUser.delete('lsssnflks');
    verify(userService.deleteUser(anyString())).once();
  });
});
