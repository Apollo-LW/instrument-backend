import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Group } from 'src/groups/schema/groups.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly course: Model<Group>){};

  async createCourse(body: Course): Promise<Course> {
    const course = new this.course(body);
    return course.save();
  }
    
  async getAllCourse() {
    return this.course.find().exec();
  }

  // create(createCourseDto: CreateCourseDto) {
  //   return 'This action adds a new course';
  // }

  // findAll() {
  //   return `This action returns all courses`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} course`;
  // }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
}
