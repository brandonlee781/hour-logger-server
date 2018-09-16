import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { PROJECT_REPO_TOKEN } from '../../constants';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async findAll(user): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['logs'],
      where: { user },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id, user): Promise<Project> {
    return await this.projectRepository.findOne({
      relations: ['logs'],
      where: { id, user },
    });
  }

  async create(name, color, userId): Promise<Project> {
    const user = await this.userService.findOne(userId);
    const newProject = new Project();

    newProject.name = name;
    newProject.color = color;
    newProject.user = user;

    return await this.projectRepository.save(newProject);
  }

  async update(id, patch, userId): Promise<Project> {
    const user = await this.userService.findOne(userId);
    const project = await this.projectRepository.findOne({
      where: { id, user },
    });

    const patched = Object.assign({}, project, patch);

    return await this.projectRepository.save(patched);
  }

  async toggleFavorite(id, userId): Promise<Project> {
    const user = await this.userService.findOne(userId);
    const project = await this.projectRepository.findOne({
      where: { id, user },
    });
    project.favorite = !project.favorite;

    return await this.projectRepository.save(project);
  }

  async delete(id, user): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id, user },
    });

    if (project) {
      return await this.projectRepository.remove(project);
    }

    throw new HttpException('Project Not Found', HttpStatus.NOT_FOUND);
  }
}
