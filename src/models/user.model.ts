import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Job } from './jobs.models';
import { WorkingDetails } from './workExpereience.model';
import { UserDetails } from './userDetails.model';
import { EducationalDetails } from './educationalDetails.model';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
    password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    middleName: string;

  @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
    gender: Gender;

  @Column({ type: 'enum', enum: role, nullable: true })
    role: role;

  @OneToMany(() => Job, (job) => job.user)
    job: Job[];

  @Column({ type: 'boolean', nullable: false, default:false })
    profileVisit: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

  @OneToMany(() => WorkingDetails, (workingDetails) => workingDetails.user)
    workingDetails: WorkingDetails;

  @OneToMany(() => UserDetails, (userDetails) => userDetails.user)
    userDetails: UserDetails;

  @OneToMany(() => EducationalDetails, (educationalDetails) => educationalDetails.user)
    educationalDetails: EducationalDetails;
}
