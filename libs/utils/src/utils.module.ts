import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ClerkService } from '@utils/application/clerk/clerk.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [UtilsService, ClerkService, HttpModule],
  exports: [UtilsService],
})
export class UtilsModule {}
