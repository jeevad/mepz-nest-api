import { Module } from '@nestjs/common';
import { RegistermodelService } from './registermodel.service';
import { RegistermodelController } from './registermodel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Registermodel,
  RegistermodelSchema,
} from 'src/schemas/registermodel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Registermodel.name,
        schema: RegistermodelSchema,
      },
    ]),
  ],
  controllers: [RegistermodelController],
  providers: [RegistermodelService],
})
export class RegistermodelModule {}
