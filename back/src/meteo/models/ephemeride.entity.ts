/**
 * This is an Epehemeride which transports informations like
 * sunrise, sunset times
 *
 */

export class Ephemeride {
    
    /**
     * Latitude
     * @example 48.112
     */    
    latitude: number;
    
    /**
     * Longitude
     * @example -1.6819
     */
    longitude: number;
    

    /**
     * INSEE code of city
     * @example 94081
     */
    insee: string;
    
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
     * Sunrise hour 
     * @example '08:23'
     */
    sunrise: string;
    
    /**
     * Sunset hour
     * @example '18:17'
     */
    sunset: string;
   
    /**
     * Duration of day 
     * @example '09:54',
     */
    duration_day: string;
    
    /**
     * Gain or loss of duration of the day compared to the day before in minutes
     * @example 3
     */
    diff_duration_day:number;
    
    /**
     * Moon age in day
     * @example 25.4
     */
    moon_age: number;
     
    /**
     * Lib of moon phase (only in French)
     * @example 'Dernier croissant'
     */
    moon_phase: string; 

}