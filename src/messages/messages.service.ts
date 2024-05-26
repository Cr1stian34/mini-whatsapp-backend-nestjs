import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { Chat } from 'src/chats/chat.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createMessage(
    chatId: number,
    content: string,
    userId: number,
  ): Promise<Message> {
    const chat = await this.chatRepository.findOneBy({ id: chatId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!chat) {
      throw new Error('Chat not found');
    }

    if (!user) {
      throw new Error('User not found');
    }
    const message = this.messageRepository.create({
      content,
      chat,
      sender: user,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesForChat(chatId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { chat: { id: chatId } },
      relations: ['sender'],
    });
  }
}
