import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schema/tasks.schema';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: Task) {
    return this.tasksService.create(task);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Get('/user/:userId')
  countUserTasks(@Param('userId') userId: string) {
    return this.tasksService.countUserTask(userId);
  }

  @Get('/user/list/:userId')
  getUserTasks(@Param('userId') userId: string) {
    return this.tasksService.getUserTasks(userId);
  }

  @Get('/user/exam/:userId')
  getUserExams(@Param('userId') userId: string) {
    return this.tasksService.getUserExams(userId);
  }

  @Get('/count/:userId')
  countUserLastMonthTask(@Param('userId') userId: string) {
    return this.tasksService.countUserTaskDoneLastMonth(userId);
  }

  @Get('/count/due/:userId')
  countUserDueWeekTask(@Param('userId') userId: string) {
    return this.tasksService.countUserTaskDueWeek(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
