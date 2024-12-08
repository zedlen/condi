import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'addressLine1',
    example: 'Calle siempre viva 123',
    type: 'string',
  })
  addressLine1: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'addressLine2',
    example: 'Colonia Nuevo Mexico',
    type: 'string',
  })
  addressLine2: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'Zipcode', example: '06000', type: 'string' })
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'City', example: 'Naucalpan', type: 'string' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'state', example: 'Mexico', type: 'string' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'Country', example: 'Mexico', type: 'string' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ title: 'Name', example: 'Privada Nueva', type: 'string' })
  name: string;

  //Not documented as is for internal use
  requestId?: string;
  userId?: string;
}
