import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule,UsuariosModule,ConfigModule.forRoot(),JwtModule.register({privateKey:process.env.JWT_SECRET,signOptions:{expiresIn:'1h'}})],
    controllers: [
        AuthController,],
    providers: [
        AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule { }
