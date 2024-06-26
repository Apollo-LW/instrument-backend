import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskUser } from './schema/taskuser.schema';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name) private readonly task: Model<Task>,
    @InjectModel(TaskUser.name) private readonly taskUser: Model<TaskUser>,
  ){};

  getTaskUserId(taskUser: TaskUser): string {
    return taskUser.taskId + taskUser.userId;
  }

  async create(body: Task): Promise<Task> {
    body.createdAt = Date.now().toString();
    if (!body.status) {
      body.status = "Not Started";
    }
    const createTask = new this.task(body);
    const data = await createTask.save();
    const addUser = new TaskUser();
    addUser.taskId = data._id.toString();
    addUser.userId = body.creatorID;
    addUser.role = "admin";
    const owner = await this.addTaskUser(addUser);
    return data;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    const data = await this.taskUser.find({userId: userId});
    return Promise.all(
      data.map(
        taskUser => this.findOne(taskUser.taskId)
        .then(task => task).then(task => {
            task.userRole = taskUser.role;
            return task;
          }
        )
    ));
  };

  async addTaskUser(taskUser: TaskUser): Promise<TaskUser> {
    const addUser = new this.taskUser(taskUser);
    addUser._id = this.getTaskUserId(taskUser);
    return addUser.save();
  }

  async countUserTask(userId: string): Promise<number> {
    return this.taskUser.countDocuments({userId: userId});
  }

  async countUserTaskDoneLastMonth(userId: string): Promise<number[]> {
    const taskUsers = await this.taskUser.find({userId: userId});
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return Promise.all(taskUsers.map((currentTaskUser) => this.task.countDocuments({
        _id: currentTaskUser.taskId,
        status: 'Finished',
        updatedAt: {
          $gte: date.toISOString().substring(0, 10)
        }
    })));
  };

  async getUserExams(userId: string): Promise<Task[]> {
    const taskUsers = await this.taskUser.find({userId: userId});
    return Promise.all(taskUsers.map((currentTaskUser) => this.task.findOne({
        _id: currentTaskUser.taskId,
        isExam: true,
    }).then(task => task)));
  };

  async countUserTaskDueWeek(userId: string): Promise<number[]> {
    const taskUsers = await this.taskUser.find({userId: userId});
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return Promise.all(taskUsers.map((currentTaskUser) => this.task.countDocuments({
        _id: currentTaskUser.taskId,
        status: {
          $ne: 'Finished'
        }, 
        dueDate: {
          $gte: date.toISOString().substring(0, 10)
        }
    })));
  };

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
