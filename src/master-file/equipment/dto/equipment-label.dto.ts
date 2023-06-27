import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class EquipmentlabelDto {
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  equipmentCode: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  equipmentName: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  label: string;
}
