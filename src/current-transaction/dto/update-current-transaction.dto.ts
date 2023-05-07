// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateCurrentTransactionDto } from './create-current-transaction.dto';

export class UpdateCurrentTransactionDto extends PartialType(
  CreateCurrentTransactionDto,
) {}
