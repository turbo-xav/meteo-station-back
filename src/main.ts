import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { config } from 'dotenv';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
config();
/**
 *  We can define an env var to choose another port
 */

const HTTP_PORT = process.env.HTTP_PORT || 2000;

/**
 * It starts our HTTP application
 */

const bootstrap = async () => {
  // HTTP Server définition
  /*const privateKeyFile =
    process.env.HTTP_SSL_PRIVATE_KEY || './cert/localhost/key.pem';
  const certFile = process.env.HTTP_SSL_CERT || './cert/localhost/cert.pem';

  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync(privateKeyFile),
    cert: fs.readFileSync(certFile),
  };*/
  // Create the Nest App Instance
  //const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);
  console.log(process.env);
  // All Url begin with "api" ex: http://urlweb.domain/api/....
  app.setGlobalPrefix('api');

  // Change nest default logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // Dev log with morgan
  app.use(morgan('dev'));

  // Default CORS
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONT_URL'),
    credentials: true,
  });
  // Default Helmet
  app.use(helmet());
  // CSRF Cookie parser before
  /*app.use(cookieParser());
  // For Cross domain Samesite None & only HTTPS (secure) to enable "Set-Cookie" header in response
  const cookieOptions = {
    secure: true,
    sameSite: 'none',
  };
  app.use(csurf({ cookie: cookieOptions }));*/
  // Get and return csrfToken
  /*app.use('*', (req, res, next) => {
    const token: string = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.header('Access-Control-Expose-Headers', 'XSRF-TOKEN');
    res.header('XSRF-TOKEN', token);
    console.log('token', token);
    next();
  });*/
  // Configure OPEN API Swagger
  const configOpenApi = new DocumentBuilder()
    .setTitle('Hello world API')
    .setDescription('The amazing Hello World API')
    .setVersion('1.0')
    .setExternalDoc('NestJs is your best friend', 'https://docs.nestjs.com')
    .build();
  const OpenApiDocument = SwaggerModule.createDocument(app, configOpenApi, {
    include: [AppModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('doc', app, OpenApiDocument);
  // Load API on defined PORT (cf .env file or env vars in deployment environment)
  await app.listen(HTTP_PORT);
  // Boot message
  console.log(`Application started on PORT : ${HTTP_PORT}`);
};
bootstrap();
