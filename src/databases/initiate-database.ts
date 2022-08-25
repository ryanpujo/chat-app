import { DataSource } from 'typeorm';
import { User } from '../users/entities/User';

export const AppDataSource = new DataSource({
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
