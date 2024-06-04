import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  // @Post()
  // async createMessage(
  //   @Body('content') content: string,
  //   @Body('senderId') senderId: number,
  //   @Body('recipientId') recipientId: number,
  // ) {
  //   return this.messageService.createMesssage(content, senderId, recipientId);
  // }

  // @Get(':userId')
  // async getMessagesForUser(@Param('userId') userId: number) {
  //   return this.messageService.getMessagesForUser(userId);
  // }

  @Get()
  async getMessagesBetweenUsers(
    @Query('userEmisor') userEmisor: number,
    @Query('userReceptor') userReceptor: number,
  ): Promise<Message[]> {
    return this.messageService.findMessagesBetweenUsers(
      userEmisor,
      userReceptor,
    );
  }
}
