import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoradoresModule } from './moradores/moradores.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MoradiasModule } from './moradias/moradias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import * as express from 'express'; // Importe express para usar o json middleware
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MoradoresModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    MoradiasModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Configuração do middleware de análise de corpo de solicitação
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.json()) // Middleware para analisar solicitações JSON
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
