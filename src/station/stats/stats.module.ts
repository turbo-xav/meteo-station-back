import { CacheModule, Module } from '@nestjs/common';
import { StationHttpModule } from 'src/http/station-http.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [StationHttpModule, CacheModule.register({ max: 10 })],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
