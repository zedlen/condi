import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EVENTS } from '@shared/infrastructure/constants/rabbitmq';
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

  @EventPattern(EVENTS.USER_INVITE_CLERK)
  inviteUser(@Payload() data: InviteUserRequestDTO, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    this.usersService.inviteUser(data);
    channel.ack(originalMsg);
  }
}
