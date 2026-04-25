import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { ChatdbService } from 'src/chatdb/chatdb.service';
import { Prisma } from 'src/generated/prisma/client';
@WebSocketGateway({


  cors: {
    origin: process.env.FRONTEND_URL?.split(','),
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatdbService: ChatdbService) { }

  @SubscribeMessage('join_room')
  handleMessage(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.join(roomId);
    return '';
  }
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    data: Prisma.groupChatCreateInput
  ) {
    console.log(data) 
    await this.chatdbService.save(data)
    this.server.to(data.roomId).emit("receive_message", data)

  }
}
