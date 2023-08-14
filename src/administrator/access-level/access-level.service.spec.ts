import { Test, TestingModule } from '@nestjs/testing';
import { AccessLevelService } from './access-level.service';

describe('AccessLevelService', () => {
  let service: AccessLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessLevelService],
    }).compile();

    service = module.get<AccessLevelService>(AccessLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
