import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosProviders } from './repository/usuarios.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [UsuariosController],
  providers: [UsuariosService,...UsuariosProviders],
  exports:[UsuariosService]
})
export class UsuariosModule {}
