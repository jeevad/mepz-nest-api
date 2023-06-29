import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class EquipmentPowerDto {
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  heatDissipationPower: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  data: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  bss: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  group: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  typicalPowerConsumption: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  typeOfPower: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  waterInlet: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  drainage: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  ventilationExhaust: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  medicalGas: string;

  @ApiProperty({
    type: Number,
    description: 'This is a optional property',
  })
  typicalWeight: number;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  typicalFloorLoading: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  typicalCeilingLoading: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  radiationShielding: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  corridorClearance: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  controlRoom: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  techRoom: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  chiller: string;

  @ApiProperty({
    type: String,
    format: 'binary',

    description: 'This is a optional property',
  })
  fileOne: string;

  @ApiProperty({
    type: String,
    format: 'binary',

    description: 'This is a optional property',
  })
  fileTwo: string;

  @ApiProperty({
    type: String,
    format: 'binary',

    description: 'This is a optional property',
  })
  fileThree: string;

  @ApiProperty({
    type: String,
    
    description: 'This is a optional property',
  })
  powerRemarks: string;

}
