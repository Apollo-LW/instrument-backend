import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './courses.service';
import { Course } from './schema/course.schema';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';
import { CourseNote } from './schema/coursenote.schema';
import { CourseAsset } from './schema/courseasset.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get("/user/:userId")
  countUserCourses(@Param('userId') userId: string) {
    return this.courseService.countUserCourses(userId);
  }

  @Get("/user/list/:userId")
  getUserCourses(@Param('userId') userId: string) {
    return this.courseService.getUserCourses(userId);
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

  @Post("/note")
  addNote(@Body() courseNote: CourseNote) {
    return this.courseService.addCourseNote(courseNote);
  }

  @Post("/asset")
  addAsset(@Body() courseAsset: CourseAsset) {
    return this.courseService.addCourseAsset(courseAsset);
  }

  @Post("/child/:currentId/:childId")
  addCourseChild(@Param('currentId') currentCourseId: string, @Param('childId') courseChildId: string) {
    return this.courseService.addCourseChildren(currentCourseId, courseChildId);
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

  @Delete("/note/:id")
  removeNote(@Param('id') courseNoteId: string) {
    return this.courseService.removeCourseNote(courseNoteId);
  }

  @Delete("/asset/:id")
  removeAsset(@Param('id') courseAssetId: string) {
    return this.courseService.removeAsset(courseAssetId);
  }

  @Delete("/child/:currentId/:childId")
  removeCourseChild(@Param('currentId') currentCourseId: string, @Param('childId') courseChildId: string) {
    return this.courseService.removeCourseChild(currentCourseId, courseChildId);
  }
  
}
