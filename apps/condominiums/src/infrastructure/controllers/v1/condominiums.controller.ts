import { CondominiumService } from '@condominiums/application/services/v1/condominiums.service';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { EVENTS } from '@shared/infrastructure/constants/rabbitmq';
import { CreateCondominiumRequestDTO } from '@shared/infrastructure/dtos/condominiums/create.condominiums.dto';

@Controller()
export class CondominiumsController {
  constructor(private condominiumService: CondominiumService) {}

  @MessagePattern(EVENTS.CONDOMINIUM_CREATE)
  createCondominium(
    @Payload() data: CreateCondominiumRequestDTO,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
    return this.condominiumService.createCondominium(data);
  }

  @MessagePattern(EVENTS.CONDOMINIUM_GET_ALL)
  getCondominiums(
    @Payload() data: { userId: string; requestId: string },
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
    return this.condominiumService.getCondominiums(data);
  }
}
