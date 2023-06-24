import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsBoolean,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { AddProjectDepartmentDto } from './add-project-department.dto';

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
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
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  clientOwner: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  contractNo: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  noOfBeds: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  classification: string;

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
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  signature1: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @ValidateIf((o) => !o.isTemplate)
  @IsString()
  @IsNotEmpty()
  signature2: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsBoolean()
  @IsNotEmpty()
  isTemplate: boolean;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  remarks: string;

  @ApiPropertyOptional({
    type: [AddProjectDepartmentDto],
    description: 'This is a required property',
  })
  @IsOptional()
  departments: AddProjectDepartmentDto[];
}
