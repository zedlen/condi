import {
  Controller,
  Post,
  Body,
  Inject,
  Headers,
  UseGuards,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  VERSION_NEUTRAL,
  Logger,
  HttpException,
} from '@nestjs/common';
import { CLIENTS, EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthGuard } from '@condi/application/interceptors/auth.interceptor';
import { BulkCreateUserRequestDTO } from '@shared/infrastructure/dtos/bulk.create.users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MB } from '@shared/infrastructure/constants/fileSize';
@Controller({ version: ['1', VERSION_NEUTRAL], path: 'users' })
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(@Inject(CLIENTS.USERS) private userClient: ClientProxy) {}

  @Post('invites')
  @ApiResponse({
    status: 201,
    description: 'The invitation was sended.',
    example: {},
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    example: {
      response: {
        message: 'Error verifying webhook',
        statusCode: 400,
      },
      status: 400,
      options: {
        cause: 'No matching signature found',
      },
      message: 'Error verifying webhook',
      name: 'BadRequestException',
      cause: 'No matching signature found',
    },
  })
  @ApiBody({
    type: InviteUserRequestDTO,
    description: 'Json structure for user object',
  })
  //@UseGuards(AuthGuard)
  async inviteUser(
    @Body() userData: InviteUserRequestDTO,
    @Headers() headers: any,
  ) {
    const requestId = headers['request-id'];
    const response = await this.userClient
      .send(EVENTS.USER_INVITE_CLERK, {
        ...userData,
        requestId,
      })
      .toPromise();
    if (response?.status) throw new HttpException(response, response.status);
    return response;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') user_id: string, @Headers() headers: any) {
    const requestId = headers['request-id'];
    console.log(user_id, requestId);
    return {};
  }

  @Post('bulk')
  @ApiResponse({
    status: 201,
    description: 'The invitations were sended.',
    example: {},
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    example: {
      response: {
        message: 'File with invalid format',
        statusCode: 400,
      },
      status: 400,
      options: {
        cause: 'File with invalid format',
      },
      message: 'File with invalid format',
      name: 'BadRequestException',
      cause: 'File with invalid format',
    },
  })
  @ApiBody({
    type: BulkCreateUserRequestDTO,
    description: 'Json structure for user object',
  })
  @UseInterceptors(FileInterceptor('file'))
  //@UseGuards(AuthGuard)
  async bulkCreate(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp(/^application\/(vnd\.(ms-|openxmlformats-).*)/),
        })
        .addMaxSizeValidator({ maxSize: MB * 10, message: 'File is too big' }) //10MB max file size
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    const requestId = headers['request-id'];
    this.userClient.emit(EVENTS.USER_CREATE_BULK, {
      file: file.buffer,
      requestId,
    });
    return {};
  }
}
