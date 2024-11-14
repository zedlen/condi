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
    .addServer(`http://localhost:${gatewayPort}/`, 'Local environment')
    .addServer('https://dev.condi.mx/', 'Development **not avialable yet**')
    .addServer('https://staging.condi.mx/', 'Staging **not avialable yet**')
    .addServer('https://condi.mx/', 'Production **not avialable yet**')
    .addTag('Condi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  // set cors
  const alloweOrigins = configService.get('ALLOWED_ORIGINS');
  const allowedMethods = configService.get('ALLOWED_METHODS');
  app.enableCors({
    origin: JSON.parse(alloweOrigins),
    methods: allowedMethods,
  });

  await app.listen(gatewayPort);
}
bootstrap();
