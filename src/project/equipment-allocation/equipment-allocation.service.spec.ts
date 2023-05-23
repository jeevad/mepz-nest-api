import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentAllocationService } from './equipment-allocation.service';

describe('EquipmentAllocationService', () => {
  let service: EquipmentAllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentAllocationService],
    }).compile();

    service = module.get<EquipmentAllocationService>(EquipmentAllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
