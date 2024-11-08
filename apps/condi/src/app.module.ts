import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '@condi/infrastructure/controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { WebhooksController } from '@condi/infrastructure/controllers/v1/webhooks/webhooks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS } from '@shared/infrastructure/constants/rabbitmq';
import { UsersController } from '@condi/infrastructure/controllers/v1/users/users.controller';
import { LoggerMiddleware } from '@condi/application/middlewares/logger.middleware';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '@shared/infrastructure/constants/pinoLogger';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    ClientsModule.register([
      {
        name: CLIENTS.USERS,
        transport: Transport.RMQ,
        options: {
          urls: process.env.RABBITMQ_URLS.split(','),
          queue: process.env.USERS_RABBITMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    LoggerModule.forRoot(pinoLoggerConfig),
  ],
  controllers: [AppController, WebhooksController, UsersController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
