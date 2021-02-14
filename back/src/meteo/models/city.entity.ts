/**
 * This entity represent a City (like Vitry/Seine)
 */

export class City{
    /**
     * Name of the City
     * @example 'vitry-sur-seine'
     */
    name: string;

    /**
     * Code INSEE
     * @example '94081'
     */
    insee: string;

    /**
     * Postal code
     * @example 94400
     */
    cp: number;

    /**
     * Latitude
     * @example 48.7883
     */
    latitude: number;

    /**
     * Latitude
     * @example 2.3941
     */
    longitude: number;

    /**
     * Altitude
     * @example 56
     */
    altitude: number;
    
}