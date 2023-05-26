import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEquipmentAllocationDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  equipment: string;

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
  fpq: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  qty: number;
}
