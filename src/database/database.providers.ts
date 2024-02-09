import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DATABASE_TYPE as any,
        host: process.env.DATABASE_HOST as string,
        port: parseInt(process.env.DATABASE_PORT as string),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
