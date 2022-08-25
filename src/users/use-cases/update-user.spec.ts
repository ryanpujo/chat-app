import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { BadRequest } from '../../error/error.type';
import { makeUser } from '../../fixtures/user-fixture';
import { Left, Right } from '../../utils/either';
import { UserService } from '../services/user.service';
import { UpdateUser } from './update-user';

describe('update user use case', () => {
  let userServiceMock: UserService;
  let updateUser: UpdateUser;
  beforeEach(async () => {
    userServiceMock = mock(UserService);
    updateUser = new UpdateUser(instance(userServiceMock));
  });

  it('should return a user with a new update', async () => {
    const user = makeUser();
    const updateDto = {
      lname: 'potter',
    };
    user.lname = 'potter';
    when(userServiceMock.update(user.username, updateDto)).thenResolve(user);
    const result = await updateUser.update(user.username, updateDto);
    expect(result).toEqual(new Right(user));
  });

  it('should return an error cause by user does not exist', async () => {
    when(userServiceMock.update(anyString(), anything())).thenThrow(
      new BadRequest('user does not exist')
    );
    const result = await updateUser.update('sfefefe', { email: 'srfefsfs' });
    expect(result).toEqual(new Left(new BadRequest('user does not exist')));
  });
});
