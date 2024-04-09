import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schema/course.schema';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';
import { CourseNote } from './schema/coursenote.schema';

@Controller('course')
export class CoursesController {
  constructor(private readonly courseService: courseService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() course: Course) {
    return this.courseService.create(course);
  }

  @Post("/user")
  addUser(@Body() courseUser: CourseUser) {
    return this.courseService.addCourseUser(courseUser);
  }

  @Post("/task")
  addTask(@Body() courseTask: CourseTask) {
    return this.courseService.addCourseTask(courseTask);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() course: Course) {
    return this.courseService.update(id, course);
  }

  @Patch("/user")
  updateUser(@Body() courseUser: CourseUser) {
    return this.courseService.updateUserRole(courseUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  @Delete("/user/:id") 
  removeUser(@Param('id') courseUserId: string) {
    return this.courseService.removeUser(courseUserId);
  }

  @Delete("/task/:id")
  removeTask(@Param('id') courseTaskId: string) {
    return this.courseService.removeCourseTask(courseTaskId);
  }
}