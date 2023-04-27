import { Test, TestingModule } from '@nestjs/testing';
import { ProjecttemplateService } from './projecttemplate.service';

describe('ProjecttemplateService', () => {
  let service: ProjecttemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjecttemplateService],
    }).compile();

    service = module.get<ProjecttemplateService>(ProjecttemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
