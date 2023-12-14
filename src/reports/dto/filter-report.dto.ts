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

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  lean?: boolean;

  //@IsOptional()
  //pages: number;

  // @ApiPropertyOptional({ type: String })
  // @IsOptional()
  // departmentId?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  roomId: string;

  // @ApiPropertyOptional({
  //   type: String,
  // })
  // @IsOptional()
  // @IsString()
  // searchInput: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  group: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  roomIds: string[];
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  package1?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  equipCode?: string;
  


  @ApiPropertyOptional({ type: String })
  @IsOptional()
  apq_filt?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  fpq_filt?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  filename?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  reportType?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  pagewise: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  w_sign: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  top_logo: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  b_logo: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  medical_logo: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  medical_logo2: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  medical_logo3: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  rev1?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  rev2?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  room_id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  reportFormat?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  limit: number;
}
