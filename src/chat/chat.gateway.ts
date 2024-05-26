import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatsService,
    private messageService: MessagesService,
  ) {}

  handleConnetion(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconextado: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { chatId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = parseInt(client.handshake.query.userId as string);
    const message = await this.messageService.createMessage(
      data.chatId,
      data.content,
      userId,
    );

    this.server.to(`chat_${data.chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chat_${chatId}`);
  }

  @SubscribeMessage('leaveChat')
  handleLeaveChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`chat_${chatId}`);
  }
}
