import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend access
  app.enableCors({
    origin: '*', // Replace with your frontend URL for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = 5000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
