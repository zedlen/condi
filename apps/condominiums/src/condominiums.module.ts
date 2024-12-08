import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { pinoLoggerConfig } from '@shared/infrastructure/constants/pinoLogger';
import { SharedModule } from '@shared/shared.module';
import { LoggerModule } from 'nestjs-pino';
import { CondominiumsController } from '@condominiums/infrastructure/controllers/v1/condominiums.controller';
import { CondominiumService } from '@condominiums/application/services/v1/condominiums.service';
import {
  Condominium,
  CondominiumSchema,
} from '@shared/domain/schemas/condominium.schema';
import { AddressRepository as AddressRepositoryInterface } from '@condominiums/domain/interfaces/address.repository.interface';
import { CondominiumRepository as CondominiumRepositoryInterface } from '@condominiums/domain/interfaces/condominium.repository.interface';
import { AddressRepository } from '@condominiums/infrastructure/repositories/address.repository.mongo';
import { CondominiumRepository } from '@condominiums/infrastructure/repositories/condominium.repository.mongo';
import { Address, AddressSchema } from '@shared/domain/schemas/address.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    SharedModule,
    LoggerModule.forRoot(pinoLoggerConfig),
    MongooseModule.forFeature([
      { name: Condominium.name, schema: CondominiumSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [CondominiumsController],
  providers: [
    CondominiumService,
    { provide: AddressRepositoryInterface, useClass: AddressRepository },
    {
      provide: CondominiumRepositoryInterface,
      useClass: CondominiumRepository,
    },
  ],
})
export class CondominiumsModule {}
