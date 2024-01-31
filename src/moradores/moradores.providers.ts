import { DataSource } from "typeorm";
import { Moradores } from "./entities/moradore.entity";

export const moradoresProviders = [
    {
      provide: 'MORADORES_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Moradores),
      inject: ['DATA_SOURCE'],
    },
  ];