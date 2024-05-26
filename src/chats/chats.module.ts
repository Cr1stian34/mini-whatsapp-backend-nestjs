import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/users/user.entity';
import { Message } from 'src/messages/message.entity';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Message])],
  controllers: [ChatsController],
  providers: [ChatsService, MessagesService],
  exports: [ChatsService],
})
export class ChatsModule {}
