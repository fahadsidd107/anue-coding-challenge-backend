import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { UUID } from 'node:crypto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: string ): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  create(task: Partial<Task>): Promise<Task> {
    const newTaskId = this.generateCustomId(); // Generate a custom ID
    const newTask = {...task,id:newTaskId}; // Add the custom ID to the task
    return this.taskRepository.save(newTask);
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async removeAll(): Promise<number> {
    const result = await this.taskRepository.delete({});
    return result.affected || 0; // Return the number of deleted tasks
  }

  private generateCustomId(): string {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString(); // 4 random numbers
    const randomAlphabets = Array(4)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))) // Generate random uppercase letters
      .join('');
    return `${randomNumbers}${randomAlphabets}`; // Combine numbers and alphabets
  }
}
