import { Query, Resolver, ResolveProperty, Mutation, Context, Args, Parent } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { HttpException, HttpStatus, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Log, LogService } from '../log';

const genColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

interface ProjectPayload {
  projects?: Project[];
  project?: Partial<Project>;
}

@Resolver('Project')
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => LogService))
    private readonly logService: LogService,
  ) {}

  @Query('allProjects')
  @UseGuards(AuthGuard)
  async allProjects(@Context('user') user: User): Promise<ProjectPayload> {
    const projects: Project[] = await this.projectService.findAll(user);
    return { projects };
  }

  @Query('oneProject')
  @UseGuards(AuthGuard)
  async oneProject(
    @Context('user') user: User,
    @Args('input') { id }: { id: string },
  ): Promise<ProjectPayload> {
    const project: Project = await this.projectService.findOne(id, user);
    return { project };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createProject(
    @Context('user') user: User,
    @Args('input') { name, color, client }: { name: string, color: string, client: string },
  ): Promise<ProjectPayload> {
    const project: Project = await this.projectService.create(
      { name, color },
      client,
      user,
    );
    return { project };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async toggleProjectFavorite(
    @Context('user') user: User,
    @Args('input') { id }: { id: string },
  ): Promise<ProjectPayload> {
    const project: Project = await this.projectService.toggleFavorite(id, user);
    return { project };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateProject(
    @Context('user') user: User,
    @Args('input') { id, patch }: { id: string, patch: Partial<Project> },
  ): Promise<ProjectPayload> {
    const project: Project = await this.projectService.update(id, patch, user);
    return { project };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteProject(
    @Context('user') user: User,
    @Args('input') { id }: { id: string },
  ): Promise<ProjectPayload> {
    const project: Project = await this.projectService.delete(id, user);
    return { project };
  }

  @ResolveProperty('logs')
  async getLogs(
    @Parent() project: Project,
    @Context('user') user: User,
  ): Promise<Log[]> {
    const logs = await this.logService.findAllByProjectId(project.id, user.id, {});
    return logs;
  }
}
