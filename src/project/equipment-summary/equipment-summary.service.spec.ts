import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentSummaryService } from './equipment-summary.service';

describe('EquipmentSummaryService', () => {
  let service: EquipmentSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentSummaryService],
    }).compile();

    service = module.get<EquipmentSummaryService>(EquipmentSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
