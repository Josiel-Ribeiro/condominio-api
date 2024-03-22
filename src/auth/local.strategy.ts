import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super({
            usernameField:'userName',
            passwordField:'userPass'
        })
    }

    async validate(userName:string,userPass:string){
        const user = await this.authService.validateUser(userName,userPass)
        if(!user) throw new UnauthorizedException()
        return user

    }
}