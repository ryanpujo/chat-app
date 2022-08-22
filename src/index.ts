import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(4000, () => {
  console.log('server is running');
});
export default app;
