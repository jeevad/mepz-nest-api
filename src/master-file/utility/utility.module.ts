import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { UtilityController } from './utility.controller';
import { Utility, UtilitySchema } from 'src/schemas/utility.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Utility.name,
        schema: UtilitySchema,
      },
    ]),
  ],
  controllers: [UtilityController],
  providers: [UtilityService],
})
export class UtilityModule {}
