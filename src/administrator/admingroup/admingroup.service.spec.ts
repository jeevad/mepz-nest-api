import { Test, TestingModule } from '@nestjs/testing';
import { AdmingroupService } from './admingroup.service';

describe('AdmingroupService', () => {
  let service: AdmingroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmingroupService],
    }).compile();

    service = module.get<AdmingroupService>(AdmingroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
