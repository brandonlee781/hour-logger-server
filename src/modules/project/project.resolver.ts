import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';
import { UserService } from '../user/user.service';

const genColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

@Resolver('Project')
@UseGuards(AuthGuard)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Query('allProjects')
  async allProjects(obj, args, { user }, info) {
    const projects: Project[] = await this.projectService.findAll(user.id);
    return { projects };
  }

  @Query('oneProject')
  async oneProject(obj, { input: { id } }, { user }) {
    const project: Project = await this.projectService.findOne(id, user.id);
    return { project };
  }

  @Mutation()
  async createProject(obj, { input: { name, color = genColor() } }, { user }) {
    const project: Project = await this.projectService.create(
      name,
      color,
      user.id,
    );
    return { project };
  }

  @Mutation()
  async toggleProjectFavorite(obj, { input: { id } }, { user }) {
    const project: Project = await this.projectService.toggleFavorite(id, user.id);
    return { project };
  }

  @Mutation()
  async updateProject(obj, { input: { id, patch } }, { user }) {
    const project: Project = await this.projectService.update(id, patch, user.id);
    return { project };
  }

  @Mutation()
  async deleteProject(obj, { input: { id } }, { user }, info) {
    const project: Project = await this.projectService.delete(id, user.id);
    return { project };
  }
}
