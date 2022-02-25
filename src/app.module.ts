import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeteoModule } from './meteo/meteo.module';
import { StatsModule } from './station/stats/stats.module';
import { LoggerMiddleware } from './logger.middleware';
import { StationModule } from './station/station.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

/**
 * This the root module of yout App
 */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        'db-postgresql-lon1-02137-do-user-10474124-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'wFE16HvUS8OWx63W',
      database: 'defaultdb',
      entities: [],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          ca: fs.readFileSync('./cert/postgresql/ca-certificate.crt', 'utf8'),
        },
      },
    }),
    ConfigurationModule,
    LogModule,
    MeteoModule,
    StatsModule,
    StationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /**
   * We configure all consumers
   *
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
