import { Body, Injectable } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetGroupChatByRoomIdDto } from './dto/get-chat.dto';

@Injectable()
export class ChatdbService {
    constructor(private prisma: PrismaService) { }

    async save(@MessageBody() saveChatInput: Prisma.groupChatCreateInput) {
        return await this.prisma.groupChat.create({
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

    async saveDm(data: { senderId: number; receiverId: number; message: string }) {
        return await this.prisma.chat.create({
            data: {
                senderId: data.senderId,
                receiverId: data.receiverId,
                messages: data.message,
            }
        })
    }

    async getDmMessages(senderId: number, receiverId: number) {
        return await this.prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ]
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }

}
