import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class WorkingDetails {
    @PrimaryGeneratedColumn()
      workId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
      companyName: string;

    @Column({ type: 'tinyint', default:0 })
      isWorking: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
      designation: string;

    @Column({ nullable:true })
      joiningDate:string;

    @Column({ nullable: true })
      leavingDate: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId' })
      user: User;
}
