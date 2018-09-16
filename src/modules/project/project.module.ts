import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { Project } from './project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
