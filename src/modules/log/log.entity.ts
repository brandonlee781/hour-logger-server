import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { Content } from '../shared/Content';

@Entity()
export class Log extends Content {
  @Column('decimal') duration: number;

  @Column() note: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  start: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  end: string;

  @ManyToOne(type => Project, project => project.logs)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(type => User, user => user.logs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
