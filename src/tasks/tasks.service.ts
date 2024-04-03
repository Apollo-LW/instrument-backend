import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private readonly task: Model<Task>){};

    async createTask(body: Task): Promise<Task> {
        const createNote = new this.task(body);
        return createNote.save();
      }
    
      async getAllTask() {
        return this.task.find().exec();
      }
}
