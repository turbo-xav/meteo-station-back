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
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meteo_User } from './models/user.entity';
import { Meteo_Device } from './models/device.entity';

/**
 * This the root module of yout App
 */

@Module({
  imports: [
    ConfigurationModule,
    LogModule,
    MeteoModule,
    StatsModule,
    StationModule,
    AuthModule,
    TypeOrmModule.forFeature([Meteo_User, Meteo_Device]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  /**
   * We configure all consumers
   *
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
