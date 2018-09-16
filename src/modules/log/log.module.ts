import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Log } from './log.entity';
import { LogResolver } from './log.resolver';
import { LogService } from './log.service';
import { UserModule } from '../user';
import { ProjectModule } from '../project';

@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),
    ProjectModule,
    UserModule,
  ],
  providers: [LogService, LogResolver],
  exports: [LogService],
})
export class LogModule {}
