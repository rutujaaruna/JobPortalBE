import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user.model'; // Import the User entity if needed
import { Job } from './jobs.models'; // Import the Job entity if needed

export enum ApplicationStatus {
  applicationSubmitted = 'applicationSubmitted',
  applicationViewed = 'applicationViewed',
  rejected = 'rejected',
  shortlisted = 'shortlisted',
}

@Entity()
export class JobApplicant extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
    jobApplicantId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
    applicantEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    applicantFullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    applicantRelevantSkills: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    applicantResumePath: string;

  @ManyToOne(() => User, (user) => user.job)
  @JoinColumn({ name: 'userId' }) // Specify the foreign key column
    user: User;

  @ManyToOne(() => Job, (job) => job.jobApplicant)
  @JoinColumn({ name: 'jobId' })
    job: Job;

  @Column({ type: 'text', nullable: true })
    designation: string;

  @Column({ type: 'bigint', nullable: true })
    mobileNumber: number;

  @Column({
    type: 'enum',
    enum: [
      'applicationSubmitted',
      'applicationViewed',
      'rejected',
      'shortlisted',
    ],
    nullable: false,
    default: 'applicationSubmitted',
  })
    applicationStatus: ApplicationStatus;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}
