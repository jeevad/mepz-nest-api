import { Module } from '@nestjs/common';
import { ProjecttemplateService } from './projecttemplate.service';
import { ProjecttemplateController } from './projecttemplate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Projecttemplate,
  ProjecttemplateSchema,
} from '../schemas/projecttemplate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Projecttemplate.name,
        schema: ProjecttemplateSchema,
      },
    ]),
  ],
  controllers: [ProjecttemplateController],
  providers: [ProjecttemplateService],
})
export class ProjecttemplateModule {}
