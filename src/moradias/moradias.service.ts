import { Inject, Injectable } from '@nestjs/common';
import { CreateMoradiaDto } from './dto/create-moradia.dto';
import { UpdateMoradiaDto } from './dto/update-moradia.dto';
import { Repository, ReturnDocument } from 'typeorm';
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
    const validarResponsavel = await this.moradoresRepository.findOne({ where: { idmoradores: Number(createMoradiaDto.id_responsavel) } });


   
    if (!validarResponsavel) {
        return { mensagem: "ID responsável não localizado" };
    } else {
        const novaMoradia = this.moradiasRepository.create(createMoradiaDto);
        return await this.moradiasRepository.save(novaMoradia);
    }
}


 async findAll() {

    const query = `
    SELECT
    moradias.idmoradias,
    moradias.numero,
    moradias.andar,
    moradores.nome as Responsavel
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

  async update(id: number, updateMoradiaDto: UpdateMoradiaDto) {

const validar = await this.moradiasRepository.findOne({where:{idmoradias:id}})
if(validar){
  await this.moradiasRepository.update(id,{
    numero:updateMoradiaDto.numero,
    andar:updateMoradiaDto.andar,
    id_responsavel:updateMoradiaDto.id_responsavel  })
}


  }

  remove(id: number) {
    return `This action removes a #${id} moradia`;
  }
}
