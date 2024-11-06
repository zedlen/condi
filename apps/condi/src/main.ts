import { NestFactory } from '@nestjs/core';
import { AppModule } from '@condi/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@condi/application/filters/httpException.filters';
import { ValidationPipe } from '@nestjs/common';
import { clerkMiddleware } from '@clerk/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  app.setGlobalPrefix('api');
  app.useLogger(logger);
  app.use(clerkMiddleware());
  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const gatewayPort = configService.get<number>('CONDI_PORT');

  const options = new DocumentBuilder()
    .setTitle('Condi')
    .setDescription('WIP: API to connect to Condi services')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    // .addServer('https://staging.condi.mx/', 'Staging') not avialable yet
    // .addServer('https://production.condi.mx/', 'Production') not avialable yet
    .addTag('Condi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(gatewayPort);
}
bootstrap();
