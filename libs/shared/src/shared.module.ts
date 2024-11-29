import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClerkService } from '@shared/application/services/auth/clerk/clerk.service';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { PermitService } from '@shared/application/services/permision/permit/permit.service';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';
import { XlsxService } from '@shared/application/services/file/excel/xlsx';
import { MongooseModule } from '@nestjs/mongoose';
//import { ExcelJSService } from '@shared/application/services/file/excel/exceljs';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('USERS_DB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: AuthService,
      useClass: ClerkService,
    },
    {
      provide: PermissionService,
      useClass: PermitService,
    },
    {
      provide: ExcelService,
      useClass: XlsxService,
    },
  ],
  exports: [AuthService, PermissionService, ExcelService],
})
export class SharedModule {}
