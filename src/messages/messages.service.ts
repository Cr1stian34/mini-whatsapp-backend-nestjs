import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createMesssage(
    content: string,
    senderId: number,
    recipientId: number,
  ): Promise<Message> {
    const message = this.messageRepository.create({
      content,
      sender: { id: senderId },
      recipient: { id: recipientId },
    });

    return this.messageRepository.save(message);
  }

  async getMessagesForUser(userId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { recipient: { id: userId } }],
      relations: ['sender', 'recipient'],
      order: { createdAt: 'DESC' },
    });
  }

  async findMessagesBetweenUsers(
    userEmisor: number,
    userReceptor: number,
  ): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .where(
        '(message.senderId = :userEmisor AND message.recipientId = :userReceptor) OR (message.senderId = :userReceptor AND message.recipientId = :userEmisor)',
        { userEmisor, userReceptor },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }
}
