import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import { makeUser } from './fixtures/user-fixture';
import { UserService } from './users/services/user.service';
import 'reflect-metadata';
import { AppDataSource } from './databases/initiate-database';
import { User } from './users/entities/User';
import userMiddleware from './users';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', async (req: Request, res: Response) => {
  const service = new UserService(AppDataSource.getRepository(User));
  await service.saveUser(makeUser());
  res.send('hello you');
});
app.post('/', userMiddleware.saveUser);
app.listen(4200, async () => {
  await AppDataSource.initialize();
  console.log('server is running');
});
export default app;
