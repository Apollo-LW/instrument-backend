import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Group } from 'src/groups/schema/groups.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly course: Model<Course>){};

  async create(body: Course): Promise<Course> {
    const course = new this.course(body);
    return course.save();
  }

  async findOne(id: number): Promise<Course> {
    return this.course.findById(id);
  }

  async update(id: number, course: Course): Promise<boolean> {
    return this.course.findByIdAndUpdate(id, course, {new: true});
  }

  async remove(id: number): Promise<boolean> {
    return this.course.findByIdAndDelete(id);
  }
}
