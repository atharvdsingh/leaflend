import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { WebsocketModule } from './websocket/websocket.module';
import { ConfigModule } from '@nestjs/config';
import configService from './config/configService';
import { PrismaService } from './prisma.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, RedisModule, WebsocketModule,ConfigModule.forRoot({
    isGlobal:true,
    load:[configService]
  }), ChatModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  
  
})
export class AppModule {}
