// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentBrandDto } from './create-equipment-brand.dto';

export class UpdateEquipmentBrandDto extends PartialType(
  CreateEquipmentBrandDto,
) {}
