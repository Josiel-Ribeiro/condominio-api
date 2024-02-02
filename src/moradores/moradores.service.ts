import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMoradoreDto } from './dto/create-moradore.dto';
import { UpdateMoradoreDto } from './dto/update-moradore.dto';
import { Moradores } from './entities/moradores.entity';
import { Moradias } from './entities/moradias.entity';

@Injectable()
export class MoradoresService {
  constructor(
    @Inject('MORADORES_REPOSITORY')
    private moradoresRepository: Repository<Moradores>,
    @Inject('MORADIAS_REPOSITORY')
    private moradiasRepository: Repository<Moradias>,
  ) {}

  async create(createMoradoreDto: CreateMoradoreDto) {
    const message = {
      erro: 'erro ao adicionar o registro',
      sucess: 'Registro adicionado com sucesso',
      duplicidade: 'Ja existe um registro com essas informações',
    };
    try {
      if(createMoradoreDto.moradia !==1){


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
      }else{
        return {message: "O id da moradia em questão e referente a portaria"}
      }
    } catch (error) {
      return { mensagem: message.erro, erro: error };
    }
  }

  async findAll() {
    const query = `
   


    SELECT
    TM.moradorID,
    TM.morador,
    TM.email,
    TM.telefone,
    TM.foto,
    TM.numero,
    TM.andar,
    TR.nomeR
    
    FROM (
    
       SELECT 
        moradores.idmoradores AS moradorID,
        moradores.nome  AS morador,
        moradores.email AS email,
        moradores.telefone AS telefone,
        moradores.foto AS foto,
        moradias.numero AS numero,
        moradias.andar AS andar,
        moradias.id_responsavel AS idresponsavel
        FROM moradores INNER JOIN  moradias ON moradores.moradia = moradias.idmoradias
    
    ) TM INNER JOIN (
    
    SELECT
    moradores.idmoradores AS idR,
    moradores.nome AS nomeR
    FROM moradores inner join moradias
    ON moradias.id_responsavel = moradores.idmoradores
    
    
    ) TR 
    
    ON TM.idresponsavel = TR.idR 
    WHERE TM.moradorID != 1
    GROUP BY tm.moradorID
    
`
;
    const results = await this.moradoresRepository.query(query);
    return results;
  }

  findOne(id: number) {
    if(id !== 1){
      const query = `
   
      SELECT
      TM.moradorID,
      TM.morador,
      TM.email,
      TM.telefone,
      TM.foto,
      TM.numero,
      TR.nomeR
      
      FROM (
      
         SELECT 
          moradores.idmoradores AS moradorID,
          moradores.nome  AS morador,
          moradores.email AS email,
          moradores.telefone AS telefone,
          moradores.foto AS foto,
          moradias.numero AS numero,
          moradias.andar AS andar,
          moradias.id_responsavel AS idresponsavel
          FROM moradores INNER JOIN  moradias ON moradores.moradia = moradias.idmoradias
      
      ) TM INNER JOIN (
      
      SELECT
      moradores.idmoradores AS idR,
      moradores.nome AS nomeR
      FROM moradores inner join moradias
      ON moradias.id_responsavel = moradores.idmoradores
      
      
      ) TR 
      
      ON TM.idresponsavel = TR.idR
      WHERE TM.moradorID = ${id}
      GROUP BY tm.moradorID
      `
      ;
      
      const results = this.moradoresRepository.query(query)
      
      if(results){
        return results
      }else{
        return{response:"Nemm um registro encontrado"}
      }
    }else{
      return{response:"Nemm um registro encontrado"}
    }


}

  update(id: number, updateMoradoreDto: UpdateMoradoreDto) {
    return `This action updates a #${id} moradore`;
  }

  async remove(id: number) {
   

  const validar = await this.moradiasRepository.findOne({where:{id_responsavel:id}})
  if(validar){
 this.moradiasRepository.update(validar.idmoradias,{id_responsavel:1})
 this.moradoresRepository.delete(id)
  }else{
   this.moradoresRepository.delete(id)
  }
  
 }
    
    
}
