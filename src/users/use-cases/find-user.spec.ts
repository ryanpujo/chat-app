import { anyString, instance, mock, when } from 'ts-mockito';
import { NotFound } from '../../error/error.type';
import { makeUser } from '../../fixtures/user-fixture';
import { Left, Right } from '../../utils/either';
import { UserService } from '../services/user.service';
import { FindUser } from './find-user';

describe('find user use case', () => {
  let userServiceMock: UserService;
  let findUser: FindUser;
  beforeEach(() => {
    userServiceMock = mock(UserService);
    findUser = new FindUser(instance(userServiceMock));
  });

  it('should return right with a user', async () => {
    const user = makeUser();
    when(userServiceMock.findByUsername(user.username)).thenResolve(user);
    const result = await findUser.FindByUsername(user.username);
    expect(result).toEqual(new Right(user));
  });

  it('should return a left with an error', async () => {
    when(userServiceMock.findByUsername(anyString())).thenThrow(
      new NotFound('user not found')
    );
    const result = await findUser.FindByUsername('sfsfghtht');
    expect(result).toEqual(new Left(new NotFound('user not found')));
  });
});
