import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  markUp: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  heatDissipation: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  ictPort: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  bssPort: string;
}
