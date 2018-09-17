import { Resolver, Query, Mutation, ResolveProperty, Args, Context, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ProjectService } from '../project/project.service';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

interface ClientPayload {
  clients?: Client[];
  client?: Partial<Client>;
}

@Resolver('Client')
export class ClientResolver {
  constructor(
    private readonly clientService: ClientService,
    private readonly projectService: ProjectService,
  ) {}

  @Query('allClients')
  @UseGuards(AuthGuard)
  async allClients(
    @Context('user') user: User,
  ): Promise<ClientPayload> {
    const clients = await this.clientService.findAll(user);
    return { clients };
  }

  @Query('oneClient')
  @UseGuards(AuthGuard)
  async oneClient(
    @Context('user') user: User,
    @Args('input') { id }: { id: string },
  ): Promise<ClientPayload> {
    const client = await this.clientService.findOne(id, user);
    return { client };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createClient(
    @Context('user') user: User,
    @Args('input') newClient: Partial<Client>,
  ): Promise<ClientPayload> {
    const client: Client = await this.clientService.create(newClient, user);
    return { client };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateClient(
    @Context('user') user: User,
    @Args('input') { id, patch }: { id: string, patch: Partial<Client> },
  ): Promise<ClientPayload> {
    const client: Client = await this.clientService.update(id, patch, user);
    return { client };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteClient(
    @Context('user') user: User,
    @Args('input') { id }: { id: string },
  ): Promise<ClientPayload> {
    const client: Partial<Client> = await this.clientService.delete(id, user);
    return { client };
  }

  @ResolveProperty('projects')
  async getProjects(
    @Parent() client: Client,
    @Context('user') user: User,
  ): Promise<Project[]> {
    const projects = await this.projectService.findByClient(client.id, user);
    return projects;
  }
}