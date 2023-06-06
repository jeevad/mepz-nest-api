import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEquipmentSummaryDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  num: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  equipment: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  package: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  fpq: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  apq: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  markUp: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  group: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  utility: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  remarks: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  label: string;
}
