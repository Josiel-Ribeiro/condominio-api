import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoradiasService } from './moradias.service';
import { CreateMoradiaDto } from './dto/create-moradia.dto';
import { UpdateMoradiaDto } from './dto/update-moradia.dto';

@Controller('moradias')
export class MoradiasController {
  constructor(private readonly moradiasService: MoradiasService) {}

  @Post()
 async create(@Body() createMoradiaDto: CreateMoradiaDto) {

  
  return await this.moradiasService.create(createMoradiaDto);
  
  
  }

  @Get()
  findAll() {
    return this.moradiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moradiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoradiaDto: UpdateMoradiaDto) {
    return this.moradiasService.update(+id, updateMoradiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moradiasService.remove(+id);
  }
}
