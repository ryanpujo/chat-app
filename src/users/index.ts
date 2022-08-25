import userController from './controllers';
import { makeUserMiddleware } from './user-express-middleware';

const userMiddleware = makeUserMiddleware(userController);
export default userMiddleware;
