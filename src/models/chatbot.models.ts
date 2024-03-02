import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Chatbot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_input: string;

    @Column()
    bot_output: string;
}
