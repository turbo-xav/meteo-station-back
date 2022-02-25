import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { MeteoHttpModule } from 'src/http/meteo-http.module';
import { MeteoController } from './meteo.controller';
import { MeteoService } from './meteo.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [MeteoHttpModule, CacheModule.register({ ttl: 3600 * 12, max: 10 })],
  controllers: [MeteoController],
  providers: [
    MeteoService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class MeteoModule {}
