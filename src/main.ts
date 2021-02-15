import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as helmet from 'helmet';
import * as morgan from 'morgan'; 

/**
 *  We can define an env var to choose another port
 */

const PORT = process.env.PORT || 80;

/**
 * It starts our HTTP application
 */

async function bootstrap() {
  // Create the Nest App Instance
  const app = await NestFactory.create(AppModule);

  // All Url begin with "api" ex: http://urlweb.domain/api/....
  app.setGlobalPrefix('api')
  
  // Change nest default logger 
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // Dev log with morgan
  app.use(morgan('dev'));  
  
  // Default CORS
  app.enableCors();
  // Default Helmet
  app.use(helmet());
  
  // Configure OPEN API Swagger
  const configOpenApi = new DocumentBuilder()  
  .setTitle('Hello world API')
  .setDescription('The amazing Hello World API')
  .setVersion('1.0')  
  .setExternalDoc('NestJs is your best friend','https://docs.nestjs.com') 
  .build();
  const OpenApiDocument = SwaggerModule.createDocument(app, configOpenApi, {
    include: [AppModule],    
    deepScanRoutes:true
  });  
  SwaggerModule.setup('doc', app, OpenApiDocument);  
  // Load API on defined PORT (cf .env file or env vars in deployment environment)
  await app.listen(PORT);
  // Boot message
  console.log(`Application started on PORT : ${PORT}`)
}
bootstrap();
