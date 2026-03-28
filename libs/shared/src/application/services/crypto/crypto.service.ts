import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'node:crypto';

@Injectable()
export class CryptoService {
  private key: Buffer = Buffer.from('MySecretKey');
  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get('SECRET_KEY');
    if (key) this.key = Buffer.from(key);
  }

  encrypt(plaintext) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
    const encrypted = Buffer.concat([
      iv,
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    return encrypted.toString('base64url');
  }

  decrypt(ivCiphertextB64) {
    const ivCiphertext = Buffer.from(ivCiphertextB64, 'base64url');
    const iv = ivCiphertext.subarray(0, 16);
    const ciphertext = ivCiphertext.subarray(16);
    const cipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    const decrypted = Buffer.concat([
      cipher.update(ciphertext),
      cipher.final(),
    ]);
    return decrypted.toString('utf-8');
  }
}
