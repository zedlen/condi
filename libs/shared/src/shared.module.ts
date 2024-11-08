import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkService } from '@shared/application/services/auth/clerk/clerk.service';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { PermitService } from '@shared/application/services/permision/permit/permit.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    HttpModule,
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
  ],
  exports: [AuthService, PermissionService],
})
export class SharedModule {}
