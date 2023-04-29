// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentSummaryDto } from './create-equipment-summary.dto';

export class UpdateEquipmentSummaryDto extends PartialType(
  CreateEquipmentSummaryDto,
) {}
