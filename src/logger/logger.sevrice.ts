import { LoggerService } from '@nestjs/common';

export class LoggingService implements LoggerService {
  log(message: string, ...optionalParams: any[]) {
    console.log('\x1b[36m[LOG]\x1b[0m', message, optionalParams);
  }

  error(message: string, ...optionalParams: any[]): any {
    console.log('\x1b[31m[ERROR]\x1b[0m', message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): any {
    console.log('\x1b[33m[WARN]\x1b[0m', message, optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    console.log('\x1b[34m[DEBUG]\x1b[0m', message, optionalParams);
  }

  verbose(message: string, ...optionalParams: any[]) {
    console.log('\x1b[32m[VERBOSE]\x1b[0m', message, optionalParams);
  }
}
