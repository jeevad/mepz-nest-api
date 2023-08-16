import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { ActivityLogsModule } from 'src/administrator/activity-logs/activity-logs.module';

@Module({
  imports: [
    ActivityLogsModule,
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
