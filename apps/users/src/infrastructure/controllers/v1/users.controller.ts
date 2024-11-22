import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { BulkCreateUserRequestDTO } from '@shared/infrastructure/dtos/bulk.create.users.dto';
import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { UsersService } from '@users/application/services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(EVENTS.USER_CREATED_CLERK)
  createClerkUser(@Payload() data: ClerkWebhookDto, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    this.usersService.saveUser(data);
    channel.ack(originalMsg);
  }

  @MessagePattern(EVENTS.USER_INVITE_CLERK)
  async inviteUser(
    @Payload() data: InviteUserRequestDTO,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    try {
      await this.usersService.inviteUser(data);

      return {};
    } catch (err) {
      return err;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern(EVENTS.USER_CREATE_BULK)
  bulkCreateUser(
    @Payload() data: BulkCreateUserRequestDTO,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    this.usersService.bulkCreateUsers(data);
    channel.ack(originalMsg);
  }
}
