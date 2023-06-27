// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentDto } from './create-equipment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  EquipmentPackage,
  EquipmentPackageSchema,
} from 'src/schemas/equipmentPackage.schema';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // @IsString()
  // // @IsNotEmpty()
  // remarks: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // @IsString()
  // // @IsNotEmpty()
  // utility: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // @IsString()
  // // @IsNotEmpty()
  // labels: string;

  // @ApiProperty({ type: EquipmentPackage })
  // @Prop({ type: EquipmentPackageSchema })
  // @Type(() => EquipmentPackage)
  // equipmentPackage: EquipmentPackage;

  // @ApiProperty({
  //   type: EquipmentPackage,
  //   description: 'Optional equipment package',
  // })

  // equipmentPackage?: EquipmentPackage;
}
