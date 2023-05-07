// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreatePastTransactionDto } from './create-past-transaction.dto';

export class UpdatePastTransactionDto extends PartialType(
  CreatePastTransactionDto,
) {}
