import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class InviteUserRequestDTO {
  @IsNotEmpty()
  @ApiProperty({ title: 'Name', example: 'John' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ title: 'Last name', example: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ title: 'Email', example: 'jonh.doe@mail.com' })
  email: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    title: 'Roles that will be asigned to user',
    example: ['role_id'],
  })
  roleIds: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    title: 'Condominiums where the user is asigned',
    example: ['condominium_id'],
  })
  condominiumsIds: string[];

  @IsArray()
  @ApiProperty({
    title: 'Residences asigned to user',
    example: ['residence_id'],
  })
  residencesIds: string[];

  //Not documented as is for internal use
  requestId?: string;
}
