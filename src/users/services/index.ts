import { AppDataSource } from '../../databases/initiate-database';
import { User } from '../entities/User';
import { UserService } from './user.service';

const userService = new UserService(AppDataSource.getRepository(User));
export default userService;
