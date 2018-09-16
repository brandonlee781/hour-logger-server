import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';
import { UserService } from './user.service';

@Resolver('User')
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUser')
  getUser(obj, args, { user }, info) {
    return this.userService.findCurrentUser(user); 
  }

  @Mutation()
  async updateUser(_, { input: { patch } }, { user }) {
    const updatedUser = await this.userService.update(user.id, patch);
    return { user: updatedUser };
  }
}