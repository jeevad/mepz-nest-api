import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentBrandService } from './equipment-brand.service';

describe('EquipmentBrandService', () => {
  let service: EquipmentBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentBrandService],
    }).compile();

    service = module.get<EquipmentBrandService>(EquipmentBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
