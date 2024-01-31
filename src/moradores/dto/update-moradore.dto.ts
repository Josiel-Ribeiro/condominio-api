import { PartialType } from '@nestjs/mapped-types';
import { CreateMoradoreDto } from './create-moradore.dto';

export class UpdateMoradoreDto extends PartialType(CreateMoradoreDto) {}
