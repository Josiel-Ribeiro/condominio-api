import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { MoradoresService } from './moradores.service';
import { CreateMoradoreDto } from './dto/create-moradore.dto';
import { UpdateMoradoreDto } from './dto/update-moradore.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlink } from 'fs/promises';
import { AuthGuard } from '@nestjs/passport';

@Controller('moradores')
@UseGuards(AuthGuard('jwt'))
export class MoradoresController {
  constructor(private readonly moradoresService: MoradoresService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./upload',
      filename(req, file, callback) {
        const randomName = Date.now();
      const fileName = `${randomName}${file.originalname}`;
      return callback(null, fileName);
      },
    })
  }))
async create(@Body() body:CreateMoradoreDto, @UploadedFile() file:Express.Multer.File) {
 if(body){
  body.foto = file.filename
 const resposta = await this.moradoresService.create(body)
 if(resposta.erro || resposta.mensagem === "Ja existe um registro com essas informações"){
 await unlink(`./upload/${file.filename}`)
 return resposta
 }else{
  return resposta
 }
 }
  
  }

  @Get()
  findAll() {
    return this.moradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moradoresService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./upload',
      filename(req, file, callback) {
        const randomName = Date.now();
      const fileName = `${randomName}${file.originalname}`;
      return callback(null, fileName);
      },
    })
  }))
  async update(@Param('id') id: string, @Body() updateMoradoreDto: UpdateMoradoreDto, @UploadedFile() file:Express.Multer.File) {


    updateMoradoreDto.foto = file.filename
    return this.moradoresService.update(+id, updateMoradoreDto)
   
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   if(+id !== 1){
    return this.moradoresService.remove(+id);
   }else{
    return {mensage: "Não e possivel deletar esse registro"}
   }
  }
}
