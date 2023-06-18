import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectFieldDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsOptional()
  @IsNumber()
  // @IsNotEmpty()
  equipmentIndex: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  value: string;
}
