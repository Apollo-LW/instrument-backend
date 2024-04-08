import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly course: Model<Course>){};

  async create(body: Course): Promise<Course> {
    const course = new this.course(body);
    return course.save();
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
}
