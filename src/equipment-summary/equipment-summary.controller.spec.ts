import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentSummaryController } from './equipment-summary.controller';
import { EquipmentSummaryService } from './equipment-summary.service';

describe('EquipmentSummaryController', () => {
  let controller: EquipmentSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentSummaryController],
      providers: [EquipmentSummaryService],
    }).compile();

    controller = module.get<EquipmentSummaryController>(EquipmentSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
