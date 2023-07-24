import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterReportDto {
  @ApiProperty({ type: String })
  @IsOptional()
  projectId: string;

  // @ApiPropertyOptional({ type: String })
  // @IsOptional()
  // departmentId?: string;

  // @ApiPropertyOptional({
  //   type: String,
  // })
  // @IsOptional()
  // @IsString()
  // roomId: string;

  // @ApiPropertyOptional({
  //   type: String,
  // })
  // @IsOptional()
  // @IsString()
  // searchInput: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  filename?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  reportType?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  reportFormat?: string;
}
