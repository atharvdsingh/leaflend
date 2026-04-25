import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import configService from './config/configService';
import { PrismaService } from './prisma.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatdbModule } from './chatdb/chatdb.module';

@Module({
  imports: [AuthModule, RedisModule,ConfigModule.forRoot({
    isGlobal:true,
    load:[configService]
  }), ChatModule, ChatdbModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  
  
})
export class AppModule {}
