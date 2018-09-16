import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';

interface TaskRes {
  task: Task;
}
interface TasksRes {
  tasks: Task[];
}

@Resolver('Task')
@UseGuards(AuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query('allTasks')
  async allTasks(obj, { options = {} }, { user }, info): Promise<TasksRes> {
    const tasks = await this.taskService.findAll(user.id, options);
    return { tasks };
  }

  @Query('projectTasks')
  async projectTasks(obj, { input: { project }, options = {} }, { user }): Promise<TasksRes> {
    const tasks = await this.taskService.findByProject(project, user, options);
    return { tasks };
  }
  @Query('allProjectTasks')
  async allProjectTasks(obj, { input: { project }, options = {} }, { user }): Promise<TasksRes> {
    const tasks = await this.taskService.findAllByProject(project, user, options);
    return { tasks };
  }

  @Query('oneTask')
  async oneTask(obj, { input: { id } }, { user }): Promise<TaskRes> {
    const task = await this.taskService.findOne(id, user.id);
    return { task };
  }

  @Mutation()
  async createTask(_, { input: { task } }, { user }): Promise<TaskRes> {
    const newTask = await this.taskService.createTask(task, user);
    return { task: newTask };
  }

  @Mutation()
  async toggleTask(_, { input: { id } }, { user }): Promise<TaskRes> {
    const toggledTask = await this.taskService.toggleTask(id, user.id);
    return { task: toggledTask };
  }

  @Mutation()
  async updateTask(_, { input: { id, patch } }, { user }): Promise<TaskRes> {
    const task = await this.taskService.updateTask(id, patch, user.id);
    return { task };
  }

  @Mutation()
  async updateTaskParent(_, { input: { id, parent } }, { user }): Promise<TaskRes> {
    const task = await this.taskService.updateParent(id, parent, user.id);
    return { task };
  }

  @Mutation()
  async deleteTask(_, { input: { id } }, { user }) {
    const task = await this.taskService.deleteTask(id, user.id);
    return { task };
  }

}
