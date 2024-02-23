import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMoradoreDto } from './dto/create-moradore.dto';
import { UpdateMoradoreDto } from './dto/update-moradore.dto';
import { Moradores } from './entities/moradores.entity';
import { Moradias } from './entities/moradias.moradores.entity';
import { access, constants, unlink } from 'fs/promises';

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
      if (createMoradoreDto.moradia !== 1) {
        const validar = await this.moradoresRepository.findOne({
          where: {
            nome: createMoradoreDto.nome,
            email: createMoradoreDto.email,
          },
        });
        if (!validar) {
          createMoradoreDto.moradia = Number(createMoradoreDto.moradia);
          const newRegister =
            this.moradoresRepository.create(createMoradoreDto);
          if (newRegister) {
            await this.moradoresRepository.save(newRegister);
            return { mensagem: message.sucess };
          } else {
            return { mensagem: message.erro };
          }
        } else {
          return { mensagem: message.duplicidade };
        }
      } else {
        return { message: 'O id da moradia em questão e referente a portaria' };
      }
    } catch (error) {
      return { mensagem: message.erro, erro: error };
    }
  }

  async findAll() {
    const query = `
   


    select
    moradores.idmoradores as id,
    moradores.nome as nome,
    moradores.telefone as tell,
    moradores.email as email,
    moradores.foto as foto,
    moradias.numero as numero,
    moradias.andar as andar
  from
    moradores
    inner join moradias on moradores.moradia = moradias.idmoradias
    and moradores.idmoradores != 1
    
`;
    const results = await this.moradoresRepository.query(query);

    return results.map((item) => ({
      ...item,
      foto: `http://localhost:4000/${item.foto}`,
    }));
  }

  async findOne(id: number) {
    const query = `
   
      select
      moradores.idmoradores as id,
      moradores.nome as nome,
      moradores.telefone as tell,
      moradores.email as email,
      moradores.foto as foto,
      moradias.numero as numero,
      moradias.andar as andar
    from
      moradores
      inner join moradias on moradores.moradia = moradias.idmoradias
      and moradores.idmoradores != 1
      where moradores.idmoradores = ${id}
      `;
    const results = await this.moradoresRepository.query(query);

    if (results.length > 0) {
      results[0].foto = `http://localhost:4000/${results[0].foto}`;
      return results[0];
    } else {
      return { response: 'Nemm um registro encontrado' };
    }
  }

  async update(id: number, updateMoradoreDto: UpdateMoradoreDto) {

    if(id === 1){
      {
        await unlink(`./upload/${updateMoradoreDto.foto}`);
        return { mensage: 'Esse ID não pode ser atualizado' };
      }
    }
    if (id !== 1) {
      const validar = await this.moradoresRepository.findOne({
        where: { idmoradores: id },
      });

      if (validar) {
        const fotoAntiga = validar.foto;
        await this.moradoresRepository.update(id, {
          nome: updateMoradoreDto.nome,
          telefone: updateMoradoreDto.telefone,
          email: updateMoradoreDto.email,
          moradia: updateMoradoreDto.moradia,
          foto: updateMoradoreDto.foto,
        });

        try {
          await access(`./upload/${fotoAntiga}`, constants.F_OK);
          // Se o arquivo existe, então pode excluí-lo
          await unlink(`./upload/${fotoAntiga}`);
        } catch (error) {
          // Se ocorrer um erro, significa que o arquivo não existe
          console.error(
            `O arquivo ${fotoAntiga} não existe ou não é acessível.`,
          );
        }

        const query = `
     
       select
       moradores.idmoradores as id,
       moradores.nome as nome,
       moradores.telefone as tell,
       moradores.email as email,
       moradores.foto as foto,
       moradias.numero as numero,
       moradias.andar as andar
     from
       moradores
       inner join moradias on moradores.moradia = moradias.idmoradias
       and moradores.idmoradores != 1
       where moradores.idmoradores = ${id}
       `;
        const results = await this.moradoresRepository.query(query);
        results[0].foto = `http://localhost:4000/${results[0].foto}`;
        return results;
      }else{
        await unlink(`./upload/${updateMoradoreDto.foto}`);
        return {response: "id não localizado"}
      }
    }  
  }

  async remove(id: number) {
    const morador = await this.moradoresRepository.findOne({
        where: { idmoradores: id },
    });
    
    if (!morador) {
        return { mensagem: 'ID não localizado' };
    }

    const fotoAntiga = morador.foto;

    const verificarSeEResponsavel = await this.moradiasRepository.findOne({
        where: { id_responsavel: id },
    });

    if (verificarSeEResponsavel) {
        await this.moradiasRepository.update(
            verificarSeEResponsavel.idmoradias,
            { id_responsavel: 1 },
        );
    }

    await this.moradoresRepository.delete(id);

    if (fotoAntiga) {
        await access(`./upload/${fotoAntiga}`, constants.F_OK);
        // Se o arquivo existe, então pode excluí-lo
        await unlink(`./upload/${fotoAntiga}`);
    }

    return { mensagem: 'Registro deletado com sucesso' };
}

}

