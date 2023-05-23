import { Module } from '@nestjs/common';
import { PastTransactionService } from './past-transaction.service';
import { PastTransactionController } from './past-transaction.controller';
import {
  PastTransaction,
  PastTransactionSchema,
} from 'src/schemas/pastTransaction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PastTransaction.name,
        schema: PastTransactionSchema,
      },
    ]),
  ],
  controllers: [PastTransactionController],
  providers: [PastTransactionService],
})
export class PastTransactionModule {}
