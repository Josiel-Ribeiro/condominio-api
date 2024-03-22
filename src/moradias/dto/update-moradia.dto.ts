import { PartialType } from '@nestjs/mapped-types';
import { CreateMoradiaDto } from './create-moradia.dto';

export class UpdateMoradiaDto {

    numero:number
    andar:number
    id_responsavel:number | null
}
