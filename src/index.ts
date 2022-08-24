import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import { makeUser } from './fixtures/user-fixture';
import { makeDb } from './users';
import { UserService } from './users/services/user.service';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', async (req: Request, res: Response) => {
  const service = new UserService(await makeDb());
  await service.saveUser(makeUser());
  res.send('hello you');
});

app.listen(4200, () => {
  console.log('server is running');
});
export default app;
