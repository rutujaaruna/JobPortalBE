import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Job } from './jobs.models';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

enum role {
  user = 'user',
  recruiter = 'recruiter',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
    firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
    lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    middleName: string;

  @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, nullable: false })
    gender: Gender;

  @Column({ type: 'enum', enum: role, nullable: false })
    role: role;

  @OneToMany(() => Job, (job) => job.user)
    job: Job[];

  @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updated_at: Date;
}
