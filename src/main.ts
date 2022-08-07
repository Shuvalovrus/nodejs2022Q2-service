import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import * as fs from 'fs';
import { LoggingService } from './logger/logger.sevrice';
import { CustomExceptionFilter } from './logger/exceptionFilter.service';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useGlobalFilters(new CustomExceptionFilter(app.get(LoggingService)));
  app.useLogger(app.get(LoggingService));
  app.useGlobalPipes(new ValidationPipe());

  process.on('unhandledRejection', () => {
    process.stdout.write('Unhandled Rejection');
    process.exit(1);
  });
  process.on('uncaughtException', () => {
    process.stdout.write('Uncaught Exception');
    process.exit(1);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./doc/api.yaml', JSON.stringify(document));

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  console.log(`App is running on port: ${port}`);
}
bootstrap();
