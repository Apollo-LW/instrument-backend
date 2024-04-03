import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private readonly task: Model<Task>){};

    async createTask(body: Task): Promise<Task> {
      const task = new this.task(body);
      return task.save();
    }
    
    async getAllTask() {
      return this.task.find().exec();
    }
}
