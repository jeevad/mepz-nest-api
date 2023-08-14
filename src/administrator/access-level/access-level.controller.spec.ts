import { Test, TestingModule } from '@nestjs/testing';
import { AccessLevelController } from './access-level.controller';
import { AccessLevelService } from './access-level.service';

describe('AccessLevelController', () => {
  let controller: AccessLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessLevelController],
      providers: [AccessLevelService],
    }).compile();

    controller = module.get<AccessLevelController>(AccessLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
