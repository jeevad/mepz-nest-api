import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rooms, RoomsSchema } from 'src/schemas/rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rooms.name,
        schema: RoomsSchema,
      },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
