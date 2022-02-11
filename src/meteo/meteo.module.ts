import { Module } from '@nestjs/common';
import { MeteoHttpModule } from 'src/http/meteo-http.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { MeteoController } from './meteo.controller';
import { MeteoService } from './meteo.service';

@Module({
  imports: [MeteoHttpModule],
  controllers: [MeteoController],
  providers: [MeteoService],
})
export class MeteoModule {}
