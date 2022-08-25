import { GeneralError } from '../error/error.type';
import { makeUser } from '../fixtures/user-fixture';
import { User } from '../users/entities/User';
import { Left, Right } from './either';

describe('test either class utility', () => {
  it('should return left', async () => {
    const l = new Left<GeneralError, User>(new GeneralError('its left wing'));
    const result = l.fold(
      (left) => left,
      (right) => right
    );
    expect(result).toBeInstanceOf(GeneralError);
    expect(result.message).toBe('its left wing');
  });

  it('should return right', async () => {
    const user = makeUser();
    const r: Right<GeneralError, User> = new Right<GeneralError, User>(user);
    const result = r.fold(
      (left) => left,
      (right) => right
    );
    expect(result).toBeInstanceOf(User);
    expect(result).toEqual(user);
  });
});
