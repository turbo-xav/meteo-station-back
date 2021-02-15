import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
export class StatsController {

  /**
   * 
   * @param statsService We just need StatsService
   */

  constructor(
    private readonly statsService: StatsService,   
  ){}

  /**
   * Get the daily stats
   */
  
  @Get('daily')
  getDailyStats(): Promise<MeteoStats>{
    return this.statsService.getDailyStats();
  }

  /**
   * Get the realtime stats
   */


  @Get('realtime')
  getRealtimeStats(): Promise<MeteoStats>{
    return this.statsService.getRealtimeStats();
  }
}
