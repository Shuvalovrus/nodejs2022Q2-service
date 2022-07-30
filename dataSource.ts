import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  entities: ['dist/src/**/entity/*.entity.js'],
  migrations: ['dist/src/migration/*.{js,ts}'],
});
