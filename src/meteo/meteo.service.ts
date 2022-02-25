import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { City } from './models/city.entity';
import { Ephemeride } from './models/ephemeride.entity';
import { Forecast } from './models/forecast.entity';
import { Meteo } from './models/meteo.entity';

/**
 * This is the meteo Service
 */

@Injectable()
export class MeteoService {
  /**
   * Url of Meteo Concept API
   *
   */

  private moeteoApiUrl: string;

  /**
   * We need :
   * - HTTP Service to call remote Meteo Concept REST service
   * - Config service to know all URL to call
   * @param httpService
   * @param configService
   */

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.moeteoApiUrl = this.configService.get('METEO_API_URL');
  }

  /**
   * Used to localise City (insee code)
   *
   * @param city : name of the city
   *
   */

  public async localise(city: string): Promise<City | undefined> {
    const url = `${this.moeteoApiUrl}/location/cities?search=${city}`;
    const response = await this.httpService.get(`${url}`).toPromise();
    return response.data !== undefined && response.data.cities !== undefined
      ? response.data.cities[0]
      : undefined;
  }

  /**
   * Used to get the meteo detail of an insee code
   *
   * @param insse : insee code (ex : 94081)
   *
   */

  public async getMeteo(insee: string): Promise<Meteo> {
    const url = `${this.moeteoApiUrl}/forecast/daily?insee=${insee}`;
    const response = await this.httpService.get(`${url}`).toPromise();
    return response.data;
  }

  /**
   * Used to get an ephemeride of an insee code
   *
   * @param insee : insee code (ex : 94081)
   */

  public async getEphemerides(insee: string): Promise<Ephemeride[]> {
    let ephemerides: Ephemeride[] = [];
    for (let day = 0; day < 14; day++) {
      const url = `${this.configService.get(
        'METEO_API_URL',
      )}/ephemeride/${day}?insee=${insee}`;
      const response = await this.httpService.get(`${url}`).toPromise();
      ephemerides.push(
        response.data !== undefined && response.data.ephemeride !== undefined
          ? response.data.ephemeride
          : null,
      );
    }
    return ephemerides;
  }

  /**
   * Used to get the forecasts of an insee code
   *
   * @param insee : insee code (ex : 94081)
   */

  public async getForecasts(insee: string): Promise<Forecast[]> {
    const url = `${this.configService.get(
      'METEO_API_URL',
    )}/forecast/daily?insee=${insee}`;
    const response = await this.httpService.get(`${url}`).toPromise();
    return response.data !== undefined && response.data.forecast !== undefined
      ? response.data.forecast
      : null;
  }
}
