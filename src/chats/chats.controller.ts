import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createChat(@Body() body, @Req() req) {
    const userId = req.user.userId;
    const { name, userIds } = body;
    userIds.push(userId);

    return this.chatsService.createChat(name, userIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(@Req() req) {
    const userId = req.user.userId;
    return this.chatsService.getChatsForUser(userId);
  }
}
