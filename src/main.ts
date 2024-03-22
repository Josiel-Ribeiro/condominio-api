import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilita CORS
  app.use(cors());

  // Configuração para permitir requisições de todos os tipos em qualquer origem
  // Você pode ajustar as opções de acordo com suas necessidades
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.useStaticAssets('uploads', { prefix: 'upload' });
  

  await app.listen(4000);
}
bootstrap();
