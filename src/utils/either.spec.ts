import { GeneralError } from '../error/error.type';
import { makeUser } from '../fixtures/user-fixture';
import { User } from '../users/entities/User';
import { Either, Left, Right } from './either';

describe('test either class utility', () => {
  it('should return left', async () => {
    const l: Either<GeneralError, User> = new Left<GeneralError, User>(
      new GeneralError('its left wing')
    );
    const result = l.fold(
      (left) => left,
      (right) => right
    );
    expect(result).toBeInstanceOf(GeneralError);
    expect((result as GeneralError).message).toBe('its left wing');
  });

  it('should return right', async () => {
    const user = makeUser();
    const r: Either<GeneralError, User> = new Right<GeneralError, User>(user);
    const result = r.fold(
      (left) => left,
      (right) => right
    );
    expect(result).toBeInstanceOf(User);
    expect(result as User).toEqual(user);
  });
});
