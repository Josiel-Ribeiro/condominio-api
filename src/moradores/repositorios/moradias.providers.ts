import { DataSource } from "typeorm";
import { Moradias } from "../entities/moradias.entity";


export const moradiasProviders = [
    {
      provide: 'MORADIAS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Moradias),
      inject: ['DATA_SOURCE'],
    },
  ];