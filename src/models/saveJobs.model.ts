import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class SaveJobDetails {
    @PrimaryGeneratedColumn()
      Id: number;

    @Column({nullable: true })
      userId: number;

    @Column({nullable: true })
      jobId: number;
}
