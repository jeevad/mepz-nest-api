import { Test, TestingModule } from '@nestjs/testing';
import { RegistermodelController } from './registermodel.controller';
import { RegistermodelService } from './registermodel.service';

describe('RegistermodelController', () => {
  let controller: RegistermodelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistermodelController],
      providers: [RegistermodelService],
    }).compile();

    controller = module.get<RegistermodelController>(RegistermodelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
