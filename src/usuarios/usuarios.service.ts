import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuario.entity';



@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIOS_REPOSITORY')
    private userRepository: Repository<Usuarios>
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {

    const validar = await this.userRepository.findOne({ where: { userName: createUsuarioDto.userName } })
    if (!validar) {
  
      const newUser = this.userRepository.create(createUsuarioDto)
      newUser.userPass = await bcrypt.hash(newUser.userPass,10)
      await this.userRepository.save(newUser)

      const verificar = await this.userRepository.findOne({ where: { id: newUser.id } })
      if (verificar) {
        return {
          message: `Usuario ${verificar.userName} adicionado`
        }
      }
    } else {
      return {
        mensage: "ja existe um registro"
      }
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }


 async getByUser(userName:string){

return await this.userRepository.findOne({where:{userName:userName}})
 

 }



}
