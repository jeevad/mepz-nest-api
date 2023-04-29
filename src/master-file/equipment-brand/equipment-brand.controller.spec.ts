import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentBrandController } from './equipment-brand.controller';
import { EquipmentBrandService } from './equipment-brand.service';

describe('EquipmentBrandController', () => {
  let controller: EquipmentBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentBrandController],
      providers: [EquipmentBrandService],
    }).compile();

    controller = module.get<EquipmentBrandController>(EquipmentBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
