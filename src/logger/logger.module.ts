import { Module } from '@nestjs/common';
import { LoggingService } from './logger.sevrice';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
