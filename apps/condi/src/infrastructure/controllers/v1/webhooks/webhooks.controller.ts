import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import {
  Controller,
  Post,
  HttpCode,
  Body,
  Headers,
  Inject,
  BadRequestException,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Webhook } from 'svix';
import { CLIENTS, EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
@Controller({ version: ['1', VERSION_NEUTRAL], path: 'webhooks' })
export class WebhooksController {
  private WEBHOOK_SECRET: string;
  constructor(
    private configService: ConfigService,
    @Inject(CLIENTS.USERS) private userClient: ClientProxy,
  ) {
    this.WEBHOOK_SECRET = this.configService.get('CONDI_CLERK_WEBHOOK_SECRET');
  }

  @Post('clerk')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
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
    type: ClerkWebhookDto,
    description: 'Json structure for user object',
  })
  async create(
    @Body() clerkWebhookBody: ClerkWebhookDto,
    @Headers() headers: any,
  ) {
    if (!this.WEBHOOK_SECRET) {
      throw new Error(
        'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
      );
    }

    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];
    const requestId = headers['request-id'];
    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new BadRequestException('Error occured -- no svix headers');
    }
    const body = JSON.stringify(clerkWebhookBody);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(this.WEBHOOK_SECRET);
    // Verify the payload with the headers
    try {
      wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      throw new BadRequestException(`Error verifying webhook. ${err?.message}`);
    }

    this.userClient.emit(EVENTS.USER_CREATED_CLERK, {
      ...clerkWebhookBody,
      requestId,
    });
    return {};
  }
}
