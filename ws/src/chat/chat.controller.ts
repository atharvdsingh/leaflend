import { Body, Controller, Get, Param, Post, InternalServerErrorException } from '@nestjs/common';
import { ChatdbService } from 'src/chatdb/chatdb.service';
import { GetGroupChatByRoomIdDto } from 'src/chatdb/dto/get-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatdbService: ChatdbService) { }

  @Post()
  async findAll(@Body() getGroupChatByRoomIdDto: GetGroupChatByRoomIdDto) {
    try {
      return await this.chatdbService.getGroupChatByRoomId(getGroupChatByRoomIdDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch group chats');
    }
  }
}
