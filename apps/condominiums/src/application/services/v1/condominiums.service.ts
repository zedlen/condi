import { AddressRepository } from '@condominiums/domain/interfaces/address.repository.interface';
import { CondominiumRepository } from '@condominiums/domain/interfaces/condominium.repository.interface';
import { Injectable } from '@nestjs/common';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { CreateCondominiumRequestDTO } from '@shared/infrastructure/dtos/condominiums/create.condominiums.dto';

@Injectable()
export class CondominiumService {
  constructor(
    private permissionService: PermissionService,
    private addressRepository: AddressRepository,
    private condominiumRepository: CondominiumRepository,
  ) {}
  async createCondominium(data: CreateCondominiumRequestDTO) {
    const { isCreated, externalId, error } =
      await this.permissionService.createCondominium(data.name);
    if (!isCreated) throw error;

    const address = await this.addressRepository.createOrUpdate({
      name: data.address.name,
      addressLine1: data.address.addressLine1,
      addressLine2: data.address.addressLine2,
      zipcode: data.address.zipcode,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
      status: '',
    });

    const condominium = await this.condominiumRepository.createOrUpdate({
      name: data.name,
      status: '',
      externalId: externalId,
      type: data.type,
      totalResidences: data.totalResidences,
      avialableParkingSpots: data.avialableParkingSpots,
      address: address.toPrimitives(),
    });

    //TODO: send event to assing user to condominium
    //TODO: create all residences with peding invite status
    return condominium.toPrimitives();
  }

  async getCondominiums(data: { userId: string; requestId: string }) {
    //TODO: limit to only those that are assigned to the user
    return (await this.condominiumRepository.getAll()).map((condo) =>
      condo.toPrimitives(),
    );
  }
}
