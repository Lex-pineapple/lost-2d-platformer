import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 404;
    const errorResponse = {
      statusCode: status,
      message: 'There was an error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      errorResponse.message = exception.message;
      // this.logger.error(`HTTP exception: ${exception}`);
      this.logger.error(`HTTP exception: ${exception}`, exception.stack);
    } else if (exception instanceof Error) {
      errorResponse.message = exception.message;
      // this.logger.error(`Unhandled exception: ${exception}`);
      this.logger.error(`Unhandled exception: ${exception}`, exception.stack);
    } else {
      this.logger.error(`Unhandled exception: ${exception}`);
    }

    response.status(status).json(errorResponse);
  }
}
