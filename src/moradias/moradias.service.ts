import { Inject, Injectable } from '@nestjs/common';
import { CreateMoradiaDto } from './dto/create-moradia.dto';
import { UpdateMoradiaDto } from './dto/update-moradia.dto';
import { Repository } from 'typeorm';
import { Moradores } from 'src/moradores/entities/moradores.entity';
import { Moradias } from 'src/moradores/entities/moradias.moradores.entity';

@Injectable()
export class MoradiasService {

  constructor(
    @Inject('MORADORES_REPOSITORY')
    private moradoresRepository: Repository<Moradores>,
    @Inject('MORADIAS_REPOSITORY')
    private moradiasRepository: Repository<Moradias>,
  ) {}


 async create(createMoradiaDto: CreateMoradiaDto) {
 


  }

 async findAll() {

    const query = `
    SELECT
    moradias.numero,
    moradias.andar,
    moradores.nome
    FROM moradores INNER JOIN moradias
    ON moradias.id_responsavel = moradores.idmoradores
    
    `
    return await this.moradiasRepository.query(query)
  }

 async findOne(id: number) {


    const query = `
    SELECT
    moradias.numero,
    moradias.andar,
    moradores.nome
    FROM moradores INNER JOIN moradias
    ON moradias.id_responsavel = moradores.idmoradores
    where moradias.idmoradias = ${id}
    
    `
    return await this.moradiasRepository.query(query)


     
  }

  update(id: number, updateMoradiaDto: UpdateMoradiaDto) {
    return `This action updates a #${id} moradia`;
  }

  remove(id: number) {
    return `This action removes a #${id} moradia`;
  }
}
