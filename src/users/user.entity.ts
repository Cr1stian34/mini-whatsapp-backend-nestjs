import { channel } from 'diagnostics_channel';
import { Chat } from 'src/chats/chat.entity';
import { Message } from 'src/messages/message.entity';
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

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
