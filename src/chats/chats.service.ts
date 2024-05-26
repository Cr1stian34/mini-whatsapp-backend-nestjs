import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createChat(name: string, userIds: number[]): Promise<Chat> {
    const users = await this.usersRepository.findByIds(userIds);
    const chat = this.chatsRepository.create({ name, users });
    return this.chatsRepository.save(chat);
  }

  async getChatsForUser(userId: number): Promise<Chat[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['chats'],
    });
    return user.chats;
  }
}
