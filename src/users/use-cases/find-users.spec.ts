import { instance, mock, when } from 'ts-mockito';
import { makeUser } from '../../fixtures/user-fixture';
import { Right } from '../../utils/either';
import { UserService } from '../services/user.service';
import { FindUsers } from './find-users';

describe('find user usecase', () => {
  let userServiceMock: UserService;
  let findUsers: FindUsers;
  beforeEach(async () => {
    userServiceMock = mock(UserService);
    findUsers = new FindUsers(instance(userServiceMock));
  });
  it('should return an array of users', async () => {
    const users = [makeUser(), makeUser()];
    when(userServiceMock.findUsers()).thenResolve(users);
    const result = await findUsers.find();
    expect(result).toEqual(new Right(users));
  });
});
