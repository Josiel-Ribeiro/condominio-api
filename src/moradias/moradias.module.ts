import { Module } from '@nestjs/common';
import { MoradiasService } from './moradias.service';
import { MoradiasController } from './moradias.controller';
import { DatabaseModule } from 'src/database/database.module';
import { moradiasProviders } from 'src/moradores/repositorios/moradias.providers';
import { moradoresProviders } from 'src/moradores/repositorios/moradores.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MoradiasController],
  providers: [MoradiasService,...moradiasProviders,...moradoresProviders],
})
export class MoradiasModule {}
