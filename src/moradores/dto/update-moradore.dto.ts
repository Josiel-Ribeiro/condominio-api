import { PartialType } from '@nestjs/mapped-types';
import { CreateMoradoreDto } from './create-moradore.dto';

export class UpdateMoradoreDto {

    nome:string
    telefone:string
    email:string
    moradia:number
    foto:null |string
  

}
