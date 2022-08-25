import userUseCase from '../use-cases';
import { UserController } from './user.controller';

const userController = new UserController(userUseCase);
export default userController;
