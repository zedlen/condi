import { Module } from '@nestjs/common';
import { UsersController } from '@users/infrastructure/controllers/v1/users.controller';
import { UsersService } from '@users/application/services/users.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '@shared/infrastructure/constants/pinoLogger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    SharedModule,
    LoggerModule.forRoot(pinoLoggerConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
