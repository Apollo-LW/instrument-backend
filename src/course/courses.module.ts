import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './schema/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseUser, CourseUserSchema } from './schema/courseuser.schema';
import { CourseTask, CourseTaskSchema } from './schema/coursetask.schema';
import { CourseNote, CourseNoteSchema } from './schema/coursenote.schema';
import { CourseGraph, CourseGraphSchema } from './schema/coursegraph.schema';
import { CourseAsset, CourseAssetSchema } from './schema/courseasset.schema';
import { Task, TaskSchema } from 'src/tasks/schema/tasks.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Course.name, schema: CourseSchema },
    { name: CourseUser.name, schema: CourseUserSchema },
    { name: CourseTask.name, schema: CourseTaskSchema },
    { name: CourseNote.name, schema: CourseNoteSchema },
    { name: CourseGraph.name, schema: CourseGraphSchema },
    { name: CourseAsset.name, schema: CourseAssetSchema },
    { name: Task.name, schema: TaskSchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [CoursesController],
  providers: [CourseService],
})
export class CoursesModule {}
