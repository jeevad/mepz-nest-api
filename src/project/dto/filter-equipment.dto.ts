import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterEquipmentDto {
  @ApiProperty({ type: [String] })
  @IsOptional()
  projectId: string[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  roomId: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  searchInput: string;
}
