import { Module } from '@nestjs/common';
import { MoradoresService } from './moradores.service';
import { MoradoresController } from './moradores.controller';
import { moradoresProviders } from './repositorios/moradores.providers';
import { DatabaseModule } from 'src/database/database.module';
import { moradiasProviders } from './repositorios/moradias.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MoradoresController],
  providers: [MoradoresService,...moradoresProviders,...moradiasProviders],
})
export class MoradoresModule {}
