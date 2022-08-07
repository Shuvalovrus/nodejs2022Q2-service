import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migration/*.{js,ts}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;
