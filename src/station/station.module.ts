import { Module } from '@nestjs/common';
import { StationHttpModule } from 'src/http/station-http.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { StationController } from './station.controller';
import { StationService } from './station.service';

@Module({
  imports:[    
    StationHttpModule
  ],
  controllers: [StationController],
  providers: [StationService]
})
export class StationModule {}
