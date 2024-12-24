import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { UUID } from 'node:crypto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`); // Throw NotFoundException with custom message
    }

    return task;
  }
  
  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Delete()
  async removeAll() {
    const result = await this.tasksService.removeAll();

    if (result === 0) {
      throw new NotFoundException('No tasks found to delete');
    }

    return { message: 'All tasks deleted successfully' };
  }
}
