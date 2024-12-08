import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BulkCreateUserRequestDTO {
  @IsNotEmpty()
  @ApiProperty({
    title: 'file',
    example: 'users.xlsx',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File | Buffer;

  //Not documented as is for internal use
  requestId?: string;
  userId?: string;

  //Not documented as is for internal use
  data?: Array<JSON>;
}
