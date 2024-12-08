import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { AddressDTO } from '@shared/infrastructure/dtos/condominiums/address.condominiums.dto';

export class CreateCondominiumRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'Name', example: 'Privada Nueva', type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'Type', example: 'John', type: 'string' })
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ title: 'TotalResidences', example: 1, type: 'number' })
  totalResidences: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ title: 'avialableParkingSpots', example: 1, type: 'number' })
  avialableParkingSpots: number;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    title: 'address',
    example: {},
    type: AddressDTO,
  })
  address: AddressDTO;

  //Not documented as is for internal use
  requestId?: string;
  userId?: string;
}
