import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from './models/city.entity';
import { Ephemeride } from './models/ephemeride.entity';
import { Forecast } from './models/forecast.entity';
import { Meteo } from './models/meteo.entity';
import { MeteoService } from './meteo.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**
 * This controller enable to know meteo for a city
 * We can also get city detail like insee code, name, ...
 */

@ApiTags('Meteo')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxx',
})
@Controller('meteo')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
export class MeteoController {
  constructor(private readonly meteoService: MeteoService) {}

  /**
   * Get city detail
   *
   * @param city city name
   */

  @ApiResponse({
    status: 200,
    type: City,
    description: 'Localisation of a city according its name',
  })
  @Get('city/:city')
  async getLacolisation(@Param('city') city: string): Promise<City> {
    return this.meteoService.localise(city);
  }

  /**
   * Get actual city meteo detail
   *
   * @param city city name
   */

  @ApiResponse({
    status: 200,
    type: Meteo,
    description: 'Actual meteo',
  })
  @Get(':city')
  async getMeteo(@Param('city') city: string): Promise<Meteo> {
    const cityDetail: City = await this.meteoService.localise(city);
    return this.meteoService.getMeteo(cityDetail.insee);
  }

  /**
   * Get actual city ephemeride detail
   *
   * @param city city name
   */

  @ApiResponse({
    status: 200,
    type: Ephemeride,
    description: "Actual city's ephemeride",
  })
  @Get('ephemerides/:city')
  async getEphemeride(@Param('city') city: string): Promise<Ephemeride[]> {
    const cityDetail: City = await this.meteoService.localise(city);
    if (cityDetail?.insee !== undefined) {
      return this.meteoService.getEphemerides(cityDetail.insee);
    }
  }

  /**
   * Get actual city meteo forecast detail
   *
   * @param city city name
   */

  @ApiResponse({
    status: 200,
    type: Forecast,
    description: "Actual city's meteo forecast",
  })
  @Get('forecasts/:city')
  async getForecasts(@Param('city') city: string): Promise<Forecast[]> {
    const cityDetail: City = await this.meteoService.localise(city);
    return this.meteoService.getForecasts(cityDetail.insee);
  }
}
