import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 5000;
  console.log(`WebSocket Server starting on port ${port}`);
  app.enableCors({
    origin:process.env.FRONTEND_URL,
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  })
  await app.listen(port, '0.0.0.0',);
}
bootstrap();
