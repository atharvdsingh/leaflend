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
    const savedMessage = await this.chatdbService.save(data)
    this.server.to(data.roomId).emit("receive_message", savedMessage)

  }

  @SubscribeMessage('join_dm')
  handleJoinDm(
    @MessageBody() data: { senderId: number; receiverId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const dmRoom = `dm:${Math.min(data.senderId, data.receiverId)}:${Math.max(data.senderId, data.receiverId)}`;
    client.join(dmRoom);
    return dmRoom;
  }

  @SubscribeMessage('send_dm')
  async handleSendDm(
    @MessageBody() data: { senderId: number; receiverId: number; message: string },
  ) {
    const dmRoom = `dm:${Math.min(data.senderId, data.receiverId)}:${Math.max(data.senderId, data.receiverId)}`;
    const savedMessage = await this.chatdbService.saveDm(data);
    this.server.to(dmRoom).emit('receive_dm', savedMessage);
  }
}
