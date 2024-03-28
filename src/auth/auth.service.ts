/*
https://docs.nestjs.com/providers#services
*/
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService { 

    constructor(private readonly usuariosService:UsuariosService ,private readonly jwtService:JwtService){}


    async login(user){
        const payload ={sub:user.id,userName:user.userName}

        return {
            token: this.jwtService.sign(payload)
        }

    }

  async validateUser(userName:string,userPass:string){

    const user = await this.usuariosService.getByUser(userName)
    const senhaCorreta = await bcrypt.compare(userPass,user.userPass)
    if(user && senhaCorreta){
        return user
    }else{
        return null
    }
    
    
    }
}
