import {
  Controller,
  Post,
  Body,
  Inject,
  Headers,
  VERSION_NEUTRAL,
  Logger,
  Get,
} from '@nestjs/common';
import { CLIENTS, EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { condominiumObjectResponse } from '@condi/infrastructure/controllers/v1/condominiums/tests/__mocks/responses';
import { CreateCondominiumRequestDTO } from '@shared/infrastructure/dtos/condominiums/create.condominiums.dto';

@Controller({ version: ['1', VERSION_NEUTRAL], path: 'condominiums' })
export class CondominiumsController {
  private readonly logger = new Logger(CondominiumsController.name);
  constructor(
    @Inject(CLIENTS.CONDOMINIUMS) private condominiumsClient: ClientProxy,
  ) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'The condominium is created',
    example: condominiumObjectResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    example: {
      message: 'Missing params',
      name: 'BadRequestException',
      cause: 'Name is required',
    },
  })
  @ApiBody({
    type: CreateCondominiumRequestDTO,
    description: 'Json structure for condominium object',
  })
  //@UseGuards(AuthGuard)
  async create(
    @Body() condominiumData: CreateCondominiumRequestDTO,
    @Headers() headers: any,
  ) {
    const requestId = headers['request-id'];
    return await this.condominiumsClient.send(EVENTS.CONDOMINIUM_CREATE, {
      ...condominiumData,
      requestId,
    });
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'List of Condominiums',
    example: [condominiumObjectResponse],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    example: {
      message: 'Missing params',
      name: 'BadRequestException',
      cause: 'User without condominiums assigned',
    },
  })
  //@UseGuards(AuthGuard)
  async getAllAssigned(@Headers() headers: any) {
    const requestId = headers['request-id'];
    const userId = headers['user-id'];
    return await this.condominiumsClient.send(EVENTS.CONDOMINIUM_GET_ALL, {
      requestId,
      userId,
    });
  }
}
