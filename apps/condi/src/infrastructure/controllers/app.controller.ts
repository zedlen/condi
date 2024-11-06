import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    example: {
      status: 200,
      message: 'Server is up',
    },
  })
  getHello(): { [key: string]: any } {
    return {
      status: HttpStatus.OK,
      message: 'Server is up',
    };
  }
}
