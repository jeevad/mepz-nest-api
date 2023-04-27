import { Module } from '@nestjs/common';
import { UsermodelService } from './usermodel.service';
import { UsermodelController } from './usermodel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usermodel, UsermodelSchema } from 'src/schemas/usermodel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usermodel.name,
        schema: UsermodelSchema,
      },
    ]),
  ],
  controllers: [UsermodelController],
  providers: [UsermodelService]
})
export class UsermodelModule {}
