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
import { User } from './user.model'; // Import the User entity


  @Entity() // Set the table name to 'jobSeeker'
export class JobSeeker extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
      jobApplicantId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
      applicantEmail: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      applicantFullName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      applicantRelevantSkills: string;

    @Column({ type: 'bigint', nullable: true })
      mobileNumber: number;

    @ManyToOne(() => User, (user) => user.job)
    @JoinColumn({ name: 'userId' }) // Specify the foreign key column
      user: User;

    @Column({ type: 'varchar', length: 500, nullable: true })
      applicantResumePath: string;

    @Column({ type: 'text', nullable: true })
      designation: string;

    @CreateDateColumn({ type: 'datetime' })
      createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
      deletedAt: Date;
}
