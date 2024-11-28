import { Module } from '@nestjs/common';
import { UsersController } from '@users/infrastructure/controllers/v1/users.controller';
import { UsersService } from '@users/application/services/users.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '@shared/infrastructure/constants/pinoLogger';
import { UserRepository as UserRepositoryInterface } from '@users/domain/interfaces/user.repository.interface';
import { UserRepository } from '@users/infrastructure/repositories/user.repository.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/domain/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    SharedModule,
    LoggerModule.forRoot(pinoLoggerConfig),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UserRepositoryInterface, useClass: UserRepository },
  ],
})
export class UsersModule {}
