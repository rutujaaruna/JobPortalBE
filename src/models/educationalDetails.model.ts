import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class EducationalDetails {
    @PrimaryGeneratedColumn()
      eduId: number;

    @ManyToOne(() => User, user => user.id, { nullable: false })
    @JoinColumn({ name: 'userId' })
      user: User;

    @Column({ type: 'varchar', nullable: true })
      collageName: string;

    @Column({ type: 'varchar', nullable: true })
      programDegree: string;

    @Column({ type: 'date', nullable: true })
      startDate: string;

    @Column({ type: 'date', nullable: true })
      endDate: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      location: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;
}
