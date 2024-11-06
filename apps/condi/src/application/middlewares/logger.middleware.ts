import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.get('request-id') || v4();
    request.headers['request-id'] = requestId;
    response.setHeader('request-id', requestId);

    next();
  }
}
