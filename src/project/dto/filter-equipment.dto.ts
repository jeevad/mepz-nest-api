import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FilterEquipmentDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  lean?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  projectIds?: string[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  departmentQuery?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  roomQuery?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  equipmentQuery?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  eqCode?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  searchInput?: string;

  @ApiPropertyOptional()
  @IsOptional()
  searchQuery?: string;

  @ApiProperty({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number = 0;

  @ApiProperty({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
