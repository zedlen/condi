import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');
  constructor() {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const { stack, cause, name, message: exceptionMessage } = exception;
    const message = exceptionResponse?.['message'] || exceptionMessage;
    const error =
      exceptionResponse?.['response']?.['error'] || exceptionMessage;
    const { body, params } = request;
    this.logger.error({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error,
      message,
      stack,
      body,
      params,
      cause,
      name,
    });
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error,
      message,
      cause,
      name,
    });
  }
}
