import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatdbModule } from '../chatdb/chatdb.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
    imports: [ChatdbModule],
    providers: [ChatGateway, ChatService],
    exports: [ChatGateway],
    controllers: [ChatController]
})
export class ChatModule { }
