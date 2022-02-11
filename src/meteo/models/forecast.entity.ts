/**
 * This is a meteo forecast which tranports meteo detail
 */

export class Forecast {
  /**
   * INSEE code
   * @example 94081
   */

  insee: string;

  /**
   * Postal code
   * @example 94400
   */

  cp: number;

  /**
   * Latitude
   * @example 48.112
   */

  latitude: number;

  /**
   * Longitudde
   * @example 48.112
   */

  longitude: number;

  /**
   * Day of ephemeride (0 for first day)
   * @example 0
   */

  day: number;

  /**
   * Date Time of meteo
   * @example '2021-02-07T00:00:00+0100'
   */

  datetime: string;

  /**
   * Wheather code (cf : https://api.meteo-concept.com/documentation#code-temps)
   * @example 4
   */

  weather: number;

  /**
   * Tmin in °C
   * @example 11
   */

  tmin: number;

  /**
   * Tmax in °C
   * @example 17
   */

  tmax: number;
}
