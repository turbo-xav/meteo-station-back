import { Module } from '@nestjs/common';
import { StationHttpModule } from 'src/http/station-http.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports:[    
    StationHttpModule
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
