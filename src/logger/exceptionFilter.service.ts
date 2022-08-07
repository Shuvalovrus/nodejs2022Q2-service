import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from './logger.sevrice';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();

    this.logger.error(`${status} ${exception.message}`);

    if (exception instanceof HttpException) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      status = 500;
      response.status(status).json({
        statusCode: status,
        message: 'Internal Server Error',
      });
    }
  }
}
