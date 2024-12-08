import { ApiProperty } from '@nestjs/swagger';

interface ClerkEmail {
  created_at: number;
  email_address: string;
  id: string;
  linked_to: [];
  object: string;
  reserved: boolean;
  updated_at: number;
  verification: {
    attempts: null;
    expire_at: null;
    status: string;
    strategy: string;
  };
}
interface NewUserData {
  backup_code_enabled: boolean;
  banned: boolean;
  create_organization_enabled: boolean;
  created_at: number;
  delete_self_enabled: boolean;
  email_addresses: ClerkEmail[];
  external_accounts: any[];
  external_id: null;
  first_name: null;
  has_image: boolean;
  id: string;
  image_url: string;
  last_active_at: number;
  last_name: null;
  last_sign_in_at: null;
  legal_accepted_at: null;
  locked: boolean;
  lockout_expires_in_seconds: null;
  mfa_disabled_at: null;
  mfa_enabled_at: null;
  object: string;
  passkeys: [];
  password_enabled: boolean;
  phone_numbers: [];
  primary_email_address_id: string;
  primary_phone_number_id: null;
  primary_web3_wallet_id: null;
  private_metadata: Map<string, any>;
  profile_image_url: 'https://www.gravatar.com/avatar?d=mp';
  public_metadata: Map<string, any>;
  saml_accounts: any[];
  totp_enabled: boolean;
  two_factor_enabled: boolean;
  unsafe_metadata: Map<string, any>;
  updated_at: number;
  username: null;
  verification_attempts_remaining: number;
  web3_wallets: any[];
}
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
  data: NewUserData | Map<string, any>;

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
