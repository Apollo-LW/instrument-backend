import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schema/tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  postNote(@Body() body: Task) {
    return this.tasksService.createTask(body);
  }

  @Get()
  getAllNotes() {
    return this.tasksService.getAllTask();
  }
}
