import { anything, instance, mock, when } from 'ts-mockito';
import { GeneralError } from '../../error/error.type';
import { makeUser } from '../../fixtures/user-fixture';
import { Left, Right } from '../../utils/either';
import { UserService } from '../services/user.service';
import { SaveUser } from './save-user';

describe('save user', () => {
  let saveUser: SaveUser;
  let userServiceMock: UserService;

  beforeEach(async () => {
    userServiceMock = mock(UserService);
    saveUser = new SaveUser(instance(userServiceMock));
  });

  it('should return a right with user', async () => {
    const user = makeUser();
    when(userServiceMock.saveUser(user)).thenResolve(user);
    const result = await saveUser.save(user);
    expect(result).toEqual(new Right(user));
  });

  it('should return a left with an error', async () => {
    const error = new GeneralError('its a left wing');
    const user = makeUser();
    when(userServiceMock.saveUser(anything())).thenThrow(error);
    const result = await saveUser.save(user);
    expect(result).toEqual(new Left(new GeneralError('its a left wing')));
  });
});
