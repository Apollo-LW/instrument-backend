import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schema/course.schema';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';

@Controller('course')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() course: Course) {
    return this.coursesService.create(course);
  }

  @Post("/user")
  addUser(@Body() courseUser: CourseUser) {
    return this.coursesService.addCourseUser(courseUser);
  }

  @Post("/task")
  addTask(@Body() courseTask: CourseTask) {
    return this.coursesService.addCourseTask(courseTask);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() course: Course) {
    return this.coursesService.update(id, course);
  }

  @Patch("/user")
  updateUser(@Body() courseUser: CourseUser) {
    return this.coursesService.updateUserRole(courseUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Delete("/user/:id") 
  removeUser(@Param('id') courseUserId: string) {
    return this.coursesService.removeUser(courseUserId);
  }

  @Delete("/task/:id")
  removeTask(@Param('id') courseTaskId: string) {
    return this.coursesService.removeCourseTask(courseTaskId);
  }
}
