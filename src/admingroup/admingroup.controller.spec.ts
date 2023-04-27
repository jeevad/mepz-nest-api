import { Test, TestingModule } from '@nestjs/testing';
import { AdmingroupController } from './admingroup.controller';
import { AdmingroupService } from './admingroup.service';

describe('AdmingroupController', () => {
  let controller: AdmingroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdmingroupController],
      providers: [AdmingroupService],
    }).compile();

    controller = module.get<AdmingroupController>(AdmingroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
