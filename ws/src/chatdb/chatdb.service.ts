import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatdbService {
    constructor(private prisma: PrismaService) { }

    async saveGropChat(saveChatInput: Prisma.groupChatCreateInput) {
        await this.prisma.groupChat.create({
            data: {
                message:saveChatInput.message,
                senderId:saveChatInput.senderId,
                roomId:saveChatInput.roomId,
                
            }
        })

    }
}
