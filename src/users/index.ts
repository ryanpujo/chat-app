import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { UserService } from './services/user.service';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://udupaqyk:gcFm01O4g1lrrVvNLfncUMsLs4Dmxbdo@postgres:5432/myDatabase',
  port: 5432,
  username: 'udupaqyk',
  password: 'gcFm01O4g1lrrVvNLfncUMsLs4Dmxbdo',
  database: 'myDatabase',
  entities: [User],
  synchronize: false,
  logging: false,
});

export async function makeDb() {
  const dataSource = await AppDataSource.initialize();
  return dataSource.getRepository(User);
}
export default async function userDb() {
  const userDb = new UserService(await makeDb());
  return userDb;
}
