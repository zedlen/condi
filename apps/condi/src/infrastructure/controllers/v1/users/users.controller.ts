import { Controller, Post, Body, Inject, Headers } from '@nestjs/common';
import { CLIENTS, EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';

@Controller('users')
export class UsersController {
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
  inviteUser(@Body() userData: InviteUserRequestDTO, @Headers() headers: any) {
    const requestId = headers['request-id'];
    this.userClient.emit(EVENTS.USER_INVITE_CLERK, {
      data: userData,
      requestId,
    });
    return userData;
  }
}
