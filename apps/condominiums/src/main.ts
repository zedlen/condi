import { NestFactory } from '@nestjs/core';
import { CondominiumsModule } from '@condominiums/condominiums.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const configService = new ConfigService();
  const rabbitMQURLs = configService.get<string>('RABBITMQ_URLS');
  const condominiumsQueue = configService.get<string>(
    'CONDOMINIUMS_RABBITMQ_QUEUE',
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CondominiumsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: rabbitMQURLs.split(','),
        queue: condominiumsQueue,
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
