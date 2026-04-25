import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatdbModule } from '../chatdb/chatdb.module';

@Module({
    imports: [ChatdbModule],
    providers: [ChatGateway],
    exports: [ChatGateway]
})
export class ChatModule { }
