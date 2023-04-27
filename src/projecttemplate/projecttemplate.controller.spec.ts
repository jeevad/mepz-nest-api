import { Test, TestingModule } from '@nestjs/testing';
import { ProjecttemplateController } from './projecttemplate.controller';
import { ProjecttemplateService } from './projecttemplate.service';

describe('ProjecttemplateController', () => {
  let controller: ProjecttemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjecttemplateController],
      providers: [ProjecttemplateService],
    }).compile();

    controller = module.get<ProjecttemplateController>(ProjecttemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
