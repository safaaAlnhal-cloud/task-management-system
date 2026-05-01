import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal server error';
    let errors: string | string[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const responseObj = res as { message?: string | string[] };

        message = Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : responseObj.message || message;

        errors = responseObj.message || null;
      }
    }

    this.logger.error(`Error occurred: ${message}`, JSON.stringify(exception));

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
