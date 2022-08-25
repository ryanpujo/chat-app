import { Repository } from 'typeorm';
import { makeUser } from '../../fixtures/user-fixture';
import { User } from '../entities/User';
import { UserService } from './user.service';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('test userService', () => {
  let userService: UserService;
  let repoMock: Repository<User>;
  beforeEach(async () => {
    repoMock = mock(Repository<User>);
    userService = new UserService(instance(repoMock));
  });
  it('should save and return a user', async () => {
    const user = makeUser();
    const userDto: CreateUserDto = {
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
      createdat: user.createdat,
      modifiedat: user.modifiedat,
    };
    when(repoMock.save(anything())).thenResolve(user);
    const result = await userService.saveUser(userDto);
    verify(repoMock.save(anything())).once();
    expect(result).toEqual(user);
  });

  it('should throw an error if either username or email had been used', async () => {
    const user = makeUser();
    when(repoMock.findOne(anything())).thenResolve(user);
    when(repoMock.findOne(anything())).thenResolve(user);
    when(repoMock.save(user)).thenResolve(user);
    userService
      .saveUser(user)
      .catch((error: any) =>
        expect(error.message).toBe('either email or username had been used')
      );
    verify(repoMock.save(user)).never();
    verify(repoMock.findOne(anything())).twice();
  });

  it('should return an array of user', async () => {
    const user = makeUser();
    const user2 = makeUser();
    when(repoMock.find()).thenResolve([user, user2]);
    const result = await userService.findUsers();
    verify(repoMock.find()).once();
    expect(result).toEqual([user, user2]);
  });

  it('should return a user with certain username', async () => {
    const user: User = makeUser();
    when(repoMock.findOne(anything())).thenResolve(user);
    const result = await userService.findByUsername(user.username);
    verify(repoMock.findOne(anything())).once();
    expect(result).toEqual(user);
  });

  it('should throw error if user not found by certain username', async () => {
    const user = makeUser();
    when(repoMock.findOne(anything())).thenResolve(null);
    userService
      .findByUsername(user.username)
      .catch((error: any) =>
        expect(error.message).toBe(
          `user not found by username: ${user.username}`
        )
      );
    verify(repoMock.findOne(anything())).once();
  });

  it('should update a user', async () => {
    const user = makeUser();
    const updated = makeUser();
    updated.fname = 'conor';
    const update: UpdateUserDto = {
      username: 'ryanpujo',
      fname: 'conor',
    };
    when(repoMock.findOne(anything())).thenResolve(user);
    when(repoMock.save(update)).thenResolve(updated);

    const result = await userService.update(user.username, update);
    verify(repoMock.save(update)).once();
    expect(result).toEqual(updated);
  });

  it("should fail when updatinf user that doesn't exist", async () => {
    const user = makeUser();
    const update: UpdateUserDto = {
      username: 'ryanpujo',
      fname: 'conor',
    };
    when(repoMock.findOne(anything())).thenResolve(null);
    await userService
      .update(user.username, update)
      .catch((error) => expect(error.message).toBe('user does not exist'));
    verify(repoMock.save(anything())).never();
    verify(repoMock.findOne(anything())).once();
  });

  it('should delete user by certain username', async () => {
    const userToBeDeleted = makeUser();
    when(repoMock.delete(anything()));
    await userService.deleteUser(userToBeDeleted.username);
    verify(repoMock.delete(anything())).once();
  });
});
