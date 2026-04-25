import { Body, Injectable } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetGroupChatByRoomIdDto } from './dto/get-chat.dto';

@Injectable()
export class ChatdbService {
    constructor(private prisma: PrismaService) { }

    async save(@MessageBody() saveChatInput: Prisma.groupChatCreateInput) {
        await this.prisma.groupChat.create({
            data: {
                message: saveChatInput.message,
                senderId: saveChatInput.senderId,
                roomId: saveChatInput.roomId,

            }
        })

    }

    async getGroupChatByRoomId(getGroupChatByRoomId: GetGroupChatByRoomIdDto) {
        return await this.prisma.groupChat.findMany({
            where: {
                roomId: getGroupChatByRoomId.roomId
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }

}
