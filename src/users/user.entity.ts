import { channel } from 'diagnostics_channel';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  status?: string;

  // @ManyToMany(() => Message, (message) => message.sender)
  // sentMessages: Message[];

  // @OneToMany(() => Message, (message) => message.recipient)
  // receivedMessages: Message[];
}
