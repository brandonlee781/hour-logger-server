import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { Project } from './project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { ClientModule } from '../client/client.module';
import { LogModule } from '../log';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule, forwardRef(() => ClientModule), forwardRef(() => LogModule)],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
