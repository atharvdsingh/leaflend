import { Module } from '@nestjs/common';
import { ChatdbService } from './chatdb.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ChatdbService, PrismaService],
  exports:[ChatdbService],
})
export class ChatdbModule {}
