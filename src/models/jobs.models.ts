import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.model';
import { JobApplicant } from './jobApplicants.model';

  @Entity()
  @Index('idx_company_name', ['companyName'])
  @Index('idx_job_title', ['jobTitle'])
  @Index('idx_job_location', ['jobLocation'])
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
      jobId: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
      jobTitle: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
      companyName: string;

    @Column({ type: 'varchar', length: 255, nullable: false, default: null })
      companyWebsite: string | null;

    @Column({ type: 'int', nullable: false, default: null })
      experienceFrom: number;

    @Column({ type: 'int', nullable: false, default: null })
      experienceTo: number;

    @Column({ type: 'varchar', length: 255, nullable: false, default: null })
      contactEmail: string;

    @Column({ type: 'varchar', length: 255, nullable: false, default: null })
      jobLocation: string;

    @Column({ type: 'json', nullable: false })
      skills: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: null })
      salaryPackage: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true, default: null })
      salaryStipend: string | null;

    @Column({ type: 'datetime', nullable: false, default: null })
      applicationDeadline: Date | null;

    @Column({ type: 'text', nullable: false, default: null })
      jobsDescription: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true, default: null })
      role: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true, default: null })
      industryType: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true, default: null })
      employmentType: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true, default: null })
      department: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true, default: null })
      education: string | null;

    @ManyToOne(() => User, (user) => user.job)
    @JoinColumn({ name: 'userId' }) // Specify the foreign key column
      user: User;

    @Column({
      type: 'enum',
      enum: ['Job', 'Internship'],
      nullable: false,
      default: null,
    })
      jobType: 'Job' | 'Internship' | null;

    @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.job)
      jobApplicant: JobApplicant[];

    @CreateDateColumn({ type: 'timestamp' })
      createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
      updatedAt: Date;
}
