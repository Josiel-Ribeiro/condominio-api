import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoradoresModule } from './moradores/moradores.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [MoradoresModule,
  
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
