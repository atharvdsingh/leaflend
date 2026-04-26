import { Body, Controller, Get, Param, Post, InternalServerErrorException } from '@nestjs/common';
import { ChatdbService } from 'src/chatdb/chatdb.service';
import { GetGroupChatByRoomIdDto } from 'src/chatdb/dto/get-chat.dto';
import { GetDmChatDto } from 'src/chatdb/dto/get-dm-chat.dto';

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

  @Post('dm')
  async getDmChats(@Body() getDmChatDto: GetDmChatDto) {
    try {
      return await this.chatdbService.getDmMessages(getDmChatDto.senderId, getDmChatDto.receiverId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch DM chats');
    }
  }
}
