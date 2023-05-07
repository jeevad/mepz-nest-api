import { Module } from '@nestjs/common';
import { CurrentTransactionService } from './current-transaction.service';
import { CurrentTransactionController } from './current-transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentTransaction } from './entities/current-transaction.entity';
import { CurrentTransactionSchema } from 'src/schemas/currentTransaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CurrentTransaction.name,
        schema: CurrentTransactionSchema,
      },
    ]),
  ],
  controllers: [CurrentTransactionController],
  providers: [CurrentTransactionService],
})
export class CurrentTransactionModule {}
