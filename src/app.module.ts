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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, basename } from 'path';
console.log(
  join(
    __filename.replace(basename(__filename), ''),
    '../',
    'meteo-station-front',
  ),
);
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
    /*ServeStaticModule.forRoot({
      rootPath:join(__filename.replace(basename(__filename),''), '../', 'meteo-station-front'),
      exclude: ['/api/*'],
    }),*/
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
