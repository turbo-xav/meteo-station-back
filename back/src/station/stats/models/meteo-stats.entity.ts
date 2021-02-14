import { Measurement } from "src/station/models/mesurement.entity";

/**
  * This is meteo stats with a measurement at a precise time
  */


export class MeteoStats {
    /**
     * Timestamp
     * @example 2156464561231
     */

    ts: number;
 
    /**
     * Measurement of meteo (temperature, pressure, humidity)     
     */

    measurement: Measurement;
}