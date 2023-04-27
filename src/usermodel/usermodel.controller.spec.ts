import { Test, TestingModule } from '@nestjs/testing';
import { UsermodelController } from './usermodel.controller';
import { UsermodelService } from './usermodel.service';

describe('UsermodelController', () => {
  let controller: UsermodelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsermodelController],
      providers: [UsermodelService],
    }).compile();

    controller = module.get<UsermodelController>(UsermodelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
