import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MeteoStats } from './models/meteo-stats.entity';
import { StatsService } from './stats.service';

/**
 * A controller to retrieve all recorded stats
 */

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxx',
})
@ApiTags('Stats')
@Controller('station/stats')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
export class StatsController {
  /**
   *
   * @param statsService We just need StatsService
   */

  constructor(private readonly statsService: StatsService) {}

  /**
   * Get the daily stats
   * 50 last measure each Day at noon
   */

  @Get('daily')
  @CacheTTL(24 * 3600)
  getDailyStats(): Promise<MeteoStats> {
    return this.statsService.getDailyStats();
  }

  /**
   * Get the realtime stats
   * 50 last measures each 30 min
   */

  @Get('realtime')
  @CacheTTL(30 * 60)
  getRealtimeStats(): Promise<MeteoStats> {
    return this.statsService.getRealtimeStats();
  }
}
