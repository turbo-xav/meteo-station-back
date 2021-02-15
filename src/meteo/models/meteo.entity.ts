/**
 * Meteo entity to know temparature, weather, sunrise, sunset, ...
 */

export class Meteo {

    /**
     * Date of meteo
     * @example 2020-11-18
     */
    date: number;

    /**
     * Temparature value un °C
     * @example 20
     */

    temperature: number;

    /**
     * Wheather code
     * @example 1
     */

    weather: number;

    /**
     * Sunset time
     * @example 06:00
     */

    sunset: string;

    /**
     * Sunrise time
     * @example 21:00
     */

    sunrise: string;



}