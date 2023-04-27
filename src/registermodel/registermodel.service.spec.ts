import { Test, TestingModule } from '@nestjs/testing';
import { RegistermodelService } from './registermodel.service';

describe('RegistermodelService', () => {
  let service: RegistermodelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistermodelService],
    }).compile();

    service = module.get<RegistermodelService>(RegistermodelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
