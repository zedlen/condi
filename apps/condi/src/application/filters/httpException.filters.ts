import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');
  constructor(private configService: ConfigService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const isProd = this.configService.get('NODE_ENV') == 'production';
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const { stack, cause, name, message: exceptionMessage } = exception;
    const message = exceptionResponse?.['message'] || exceptionMessage;
    const { body, params } = request;
    this.logger.error({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      ...(!isProd && { stack }),
      body,
      params,
      cause,
      name,
    });
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      ...(!isProd && { stack }),
      cause,
      name,
    });
  }
}
