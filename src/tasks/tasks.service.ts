import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private readonly task: Model<Task>){};

    async create(body: Task): Promise<Task> {
      const createTask = new this.task(body);
      return createTask.save();
    }
  
    async findOne(id: string): Promise<Task> {
      return this.task.findById(id);
    }
  
    async update(id: string, task: Task): Promise<boolean> {
      return this.task.findByIdAndUpdate(id, task, {new: true});
    }
  
    async remove(id: string): Promise<boolean> {
      return this.task.findByIdAndDelete(id);
    }
}
