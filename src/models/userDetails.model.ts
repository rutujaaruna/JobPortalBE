import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';

export enum RelationshipStatus {
    Single = 'single',
    InRelationship = 'in_relationship',
    Married = 'married',
    Divorced = 'divorced',
    Widowed = 'widowed'
}

@Entity()
export class UserDetails {
    @PrimaryGeneratedColumn()
      detailsId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
      address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      location: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      nationality: string;

    @Column({ type: 'bigint', nullable: false })
      mobileNo: number;

    @Column({ nullable:false })
      bloodGroup:string;

    @Column({ type: 'varchar', length: 255, nullable: true })
      linkedinProfile: string;

    @Column({ type: 'enum', enum: RelationshipStatus, nullable: false })
      relationshipStatus: RelationshipStatus;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
      created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
      updated_at: Date;

      @ManyToOne(() => User, user => user.id)
      @JoinColumn({ name: 'userId' })
        user: User;
}
