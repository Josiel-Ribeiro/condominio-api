import { Module } from '@nestjs/common';
import { MoradoresService } from './moradores.service';
import { MoradoresController } from './moradores.controller';
import { moradoresProviders } from './moradores.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [MoradoresController],
  providers: [MoradoresService,...moradoresProviders],
})
export class MoradoresModule {}
