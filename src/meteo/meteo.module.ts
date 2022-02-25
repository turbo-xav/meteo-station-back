import { CacheModule, Module } from '@nestjs/common';
import { MeteoHttpModule } from 'src/http/meteo-http.module';
import { MeteoController } from './meteo.controller';
import { MeteoService } from './meteo.service';

@Module({
  imports: [MeteoHttpModule, CacheModule.register({ ttl: 3600 * 12, max: 10 })],
  controllers: [MeteoController],
  providers: [MeteoService],
})
export class MeteoModule {}
