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

/**
 *  We can define an env var to choose another port
 */

const PORT = process.env.PORT || 2000;

/**
 * It starts our HTTP application
 */

async function bootstrap() {
  const privateKeyFile = process.env.NODE_ENV === 'prod' ? './cert2/meteo-back.projets-web.fr/private.key':'./cert2/key.pem';
  const certFile = process.env.NODE_ENV === 'prod' ? './cert2/meteo-back.projets-web.fr/certificate.crt':'./cert2/cert.pem';
  const httpsOptions = {
    key: fs.readFileSync(privateKeyFile),
    cert: fs.readFileSync(certFile),
  };
  // Create the Nest App Instance
  const app = await NestFactory.create(AppModule, { httpsOptions });

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
  // CSRF
  app.use(cookieParser());
  app.use(
    csurf(
      {
        sameSite: 'none',
        secure: true,
        domaine: 'localhost',
      },
    ),
  );
  app.use('*', (req, res, next) => {
    const token: string = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.header('Access-Control-Expose-Headers', 'XSRF-TOKEN');
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header, Set-Cookie, XSRF-TOKEN',
    );
    res.header('XSRF-TOKEN', token);
    console.log('token', token);
    next();
  });

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
  await app.listen(PORT);
  // Boot message
  console.log(`Application started on PORT : ${PORT}`);
}
bootstrap();
