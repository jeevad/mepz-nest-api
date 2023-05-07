import { Test, TestingModule } from '@nestjs/testing';
import { PastTransactionController } from './past-transaction.controller';
import { PastTransactionService } from './past-transaction.service';

describe('PastTransactionController', () => {
  let controller: PastTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PastTransactionController],
      providers: [PastTransactionService],
    }).compile();

    controller = module.get<PastTransactionController>(PastTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
