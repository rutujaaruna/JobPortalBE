import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class WorkingDetails {
  @PrimaryGeneratedColumn()
    workId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
    companyName: string;

  @Column({ type: 'tinyint', default: 0 })
    isWorking: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
    designation: string;

  @Column({ nullable: true })
    joiningDate: Date;

  @Column({ nullable: true })
    leavingDate: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
    user: User;
}
