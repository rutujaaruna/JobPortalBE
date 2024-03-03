import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';
import { array } from 'joi';

@Entity()
export class SaveJobDetails {
    @PrimaryGeneratedColumn()
      Id: number;

    @Column({ nullable: true })
      userId: number;

    @Column({ type:'json', nullable: true })
      jobId: number[];

    @CreateDateColumn({ type: 'timestamp', nullable: true })
      created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
      updated_at: Date;
}
