import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
@WebSocketGateway({
  

  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join_room')
  handleMessage(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log(roomId)
    client.join(roomId);
    return '';
  }
  @SubscribeMessage('send_message')
  handlereceiveMessage(
    @MessageBody()
    data: {
      content: string;
      senderId: string;
      roomId: string;
      timestamp?: Date;
    },
  ) {
    console.log(data)
    this.server.to(data.roomId).emit("receive_message", data)

  }
}
