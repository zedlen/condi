import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';
import { CLIENTS, EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { BulkCreateUserRequestDTO } from '@shared/infrastructure/dtos/users/bulk.create.users.dto';
import { isArrayBuffer } from 'util/types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly excelService: ExcelService,
    @Inject(CLIENTS.USERS) private userClient: ClientProxy,
  ) {}

  async bulkCreateUsers(data: BulkCreateUserRequestDTO) {
    try {
      const { file, requestId } = data;
      const buffer = isArrayBuffer(file) ? file : file.buffer;
      const fileData = await this.excelService.readFileBuffer(buffer);
      const response = this.userClient.send(EVENTS.USER_CREATE_BULK, {
        data: fileData.get('NuevosResidentes') || [],
        requestId,
      });
      return response;
    } catch (error) {
      throw new HttpException(error, error?.status || 500);
    }
  }
}
