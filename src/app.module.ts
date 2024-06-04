import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { MessagesService } from './messages/messages.service';
import { MessagesController } from './messages/messages.controller';
import { User } from './users/user.entity';
import { Message } from './messages/message.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'mini-chat',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Message]),
    AuthModule,
    UsersModule,
    ChatModule,
    MessagesModule,
  ],
  controllers: [MessagesController],
  providers: [ChatGateway, ChatService, MessagesService],
})
export class AppModule {}
