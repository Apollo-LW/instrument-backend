import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './schema/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseUser, CourseUserSchema } from './schema/courseuser.schema';
import { CourseTask, CourseTaskSchema } from './schema/coursetask.schema';
import { CourseNote, CourseNoteSchema } from './schema/coursenote.schema';
import { CourseGraph, CourseGraphSchema } from './schema/coursegraph.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Course.name, schema: CourseSchema },
    { name: CourseUser.name, schema: CourseUserSchema },
    { name: CourseTask.name, schema: CourseTaskSchema },
    { name: CourseNote.name, schema: CourseNoteSchema },
    { name: CourseGraph.name, schema: CourseGraphSchema },
  ])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
