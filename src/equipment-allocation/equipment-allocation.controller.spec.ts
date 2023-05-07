import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentAllocationController } from './equipment-allocation.controller';
import { EquipmentAllocationService } from './equipment-allocation.service';

describe('EquipmentAllocationController', () => {
  let controller: EquipmentAllocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentAllocationController],
      providers: [EquipmentAllocationService],
    }).compile();

    controller = module.get<EquipmentAllocationController>(EquipmentAllocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
