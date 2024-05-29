import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private messages: { sender: string; recipient: string; message: string }[] =
    [];

  addMessage(sender: string, recipient: string, message: string) {
    this.messages.push({ sender, recipient, message });
  }

  getMessages(): { sender: string; recipient: string; message: string }[] {
    return this.messages;
  }
}
