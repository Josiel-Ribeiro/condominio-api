import { Test, TestingModule } from '@nestjs/testing';
import { MoradoresController } from './moradores.controller';
import { MoradoresService } from './moradores.service';

describe('MoradoresController', () => {
  let controller: MoradoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoradoresController],
      providers: [MoradoresService],
    }).compile();

    controller = module.get<MoradoresController>(MoradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
