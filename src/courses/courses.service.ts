import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model, Types } from 'mongoose';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';
import { CourseNote } from './schema/coursenote.schema';
import { CourseGraph } from './schema/coursegraph.schema';

@Injectable()
export class CoursesService {

  constructor(
    @InjectModel(Course.name) private readonly course: Model<Course>, 
    @InjectModel(CourseUser.name) private readonly courseUser: Model<CourseUser>,
    @InjectModel(CourseTask.name) private readonly courseTask: Model<CourseTask>,
    @InjectModel(CourseNote.name) private readonly courseNote: Model<CourseNote>,
    @InjectModel(CourseGraph.name) private readonly courseGraph: Model<CourseGraph>
  ){};

  static getCourseUserId(courseUser: CourseUser) : string {
    return courseUser.courseId + courseUser.userId
  }

  async create(body: Course): Promise<Course> {
    const createdCourse = new this.course(body);
    // TODO: add user that created the course.
    return createdCourse.save();
  }

  async findOne(id: string): Promise<Course> {
    return this.course.findById(id);
  }

  async update(id: string, course: Course): Promise<boolean> {
    return this.course.findByIdAndUpdate(id, course, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.course.findByIdAndDelete(id);
  }

  async getCourseUsers(id: string): Promise<Array<string>> {
    return this.courseUser.find({courseId: id});
  }

  async addCourseUser(courseUser: CourseUser): Promise<CourseUser> {
    const addUser = new this.courseUser(courseUser);
    addUser._id = CoursesService.getCourseUserId(courseUser);
    return addUser.save();
  }

  async updateUserRole(courseUser: CourseUser): Promise<boolean> {
    return this.courseUser.findByIdAndUpdate(CoursesService.getCourseUserId(courseUser), courseUser, {new: true});
  }

  async removeUser(courseUserId: string): Promise<boolean> {
    return this.courseUser.findByIdAndDelete(courseUserId);
  }
  
  async getCourseTasks(id: string): Promise<Array<string>> {
    return this.courseTask.find({courseId: id});
  }

  async getCourseNotes(id: string): Promise<Array<string>> {
    return this.courseNote.find({courseId: id});
  }

  async getCourseGraph(id: string): Promise<Array<string>> {
    return this.courseGraph.find({courseId: id});
  }
}
