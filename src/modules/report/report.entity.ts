import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Content } from '../shared/Content';
import { Log } from '../log/log.entity';
import { User } from '../user/user.entity';

interface ReportData {
  number?: number;
  hours?: number;
  rate?: number;
}

type ReportType = 'invoice';

@Entity()
export class Report extends Content {
  @Column()
  date: string;

  @Column()
  type: ReportType;

  @Column('jsonb')
  logs: Log[];

  @Column('jsonb')
  data: ReportData;

  @ManyToOne(type => User, user => user.invoices)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}