import { NestFactory } from '@nestjs/core';
import { UsersModule } from '@users/users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const configService = new ConfigService();
  const rabbitMQURLs = configService.get<string>('RABBITMQ_URLS');
  const usersQueue = configService.get<string>('USERS_RABBITMQ_QUEUE');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: rabbitMQURLs.split(','),
        queue: usersQueue,
        noAck: false,
        queueOptions: {
          durable: false,
        },
        prefetchCount: 1,
      },
    },
  );
  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
