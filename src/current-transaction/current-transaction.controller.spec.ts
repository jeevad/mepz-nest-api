import { Test, TestingModule } from '@nestjs/testing';
import { CurrentTransactionController } from './current-transaction.controller';
import { CurrentTransactionService } from './current-transaction.service';

describe('CurrentTransactionController', () => {
  let controller: CurrentTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentTransactionController],
      providers: [CurrentTransactionService],
    }).compile();

    controller = module.get<CurrentTransactionController>(
      CurrentTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
