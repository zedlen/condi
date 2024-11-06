import { ApiProperty } from '@nestjs/swagger';

export class ClerkWebhookDto {
  @ApiProperty({
    example: {
      abandon_at: 1733370610221,
      actor: null,
      client_id: 'client_2oPkLiwH5wvZ5OKBwlzp2PTKpzK',
      created_at: 1730778610223,
      expire_at: 1731383410221,
      id: 'sess_2oPkU7n9HXfN4LKL5OUUi5gpDad',
      last_active_at: 1730778610221,
      object: 'session',
      status: 'active',
      updated_at: 1730778610300,
      user_id: 'user_2oPkU8Nmg6giKwlP7xOdCmXM3FR',
    },
    required: true,
  })
  data: object;

  @ApiProperty({
    example: 'event',
    required: true,
  })
  object: 'event';

  @ApiProperty({
    example: 'user.created',
    required: true,
  })
  type: string;

  @ApiProperty({
    example: '1730841523',
  })
  timestamp?: string;

  //Not documented as is for internal use
  requestId?: string;
}
