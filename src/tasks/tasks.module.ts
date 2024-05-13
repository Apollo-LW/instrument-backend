import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/tasks.schema';
import { TaskUser, TaskUserSchema } from './schema/taskuser.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Task.name, schema: TaskSchema },
    { name: TaskUser.name, schema: TaskUserSchema},
  ])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
