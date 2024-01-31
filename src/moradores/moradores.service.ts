import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMoradoreDto } from './dto/create-moradore.dto';
import { UpdateMoradoreDto } from './dto/update-moradore.dto';
import { Moradores } from './entities/moradore.entity';

@Injectable()
export class MoradoresService {
  constructor(
    @Inject('MORADORES_REPOSITORY')
    private moradoresRepository: Repository<Moradores>,
  ) {}

  async create(createMoradoreDto: CreateMoradoreDto) {
    const message = {
      erro: 'erro ao adicionar o registro',
      sucess: 'Registro adicionado com sucesso',
      duplicidade: 'Ja existe um registro com essas informações',
    };
    try {
      const validar = await this.moradoresRepository.findOne({
        where: {
          nome: createMoradoreDto.nome,
          email: createMoradoreDto.email,
        },
      });
      if (!validar) {
        createMoradoreDto.moradia = Number(createMoradoreDto.moradia);
        const newRegister = this.moradoresRepository.create(createMoradoreDto);
        if (newRegister) {
          await this.moradoresRepository.save(newRegister);
          return { mensagem: message.sucess };
        } else {
          return { mensagem: message.erro };
        }
      } else {
        return { mensagem: message.duplicidade };
      }
    } catch (error) {
      return { mensagem: message.erro, erro: error };
    }
  }

 async findAll() {
    return await this.moradoresRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} moradore`;
  }

  update(id: number, updateMoradoreDto: UpdateMoradoreDto) {
    return `This action updates a #${id} moradore`;
  }

  remove(id: number) {
    return `This action removes a #${id} moradore`;
  }
}
