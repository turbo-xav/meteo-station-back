import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwitchState } from './models/switch-state.interface';
import { Measurement } from './models/mesurement.entity';
import { StationService } from './station.service';

/**
  * You can control the meteo station with this controller
  */


@ApiTags('Station')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxx',
})
@Controller('station')
export class StationController {
    constructor(private readonly stationService: StationService) { }
    
    /**
      * Get all devices
      */

    @Get('devices')
    async getDevices(): Promise<any> {      
      return await this.stationService.getDevices();
    }

    /**
     * Get registered meteo station
     */

    @Get('device')
    async getDevice(): Promise<any> {      
      return await this.stationService.getDevice();
    }

    /**
     * Get current state of a resource
     * - heater
     * - led
     * - screen
     * 
     * @param resource 
     */

    @Get('device/:resource/state')
    async getState(@Param('resource') resource: string): Promise<SwitchState> {
      return await this.stationService.getState(resource);
    }

    /**
     * Get current measurement of registered meteo station 
     */

    @Get('device/mesurement')    
    @ApiResponse({
        status: 200,
        type: Measurement,
        description: 'Measurement of temperature, humidity, pressure' }
    )
    async meteo(): Promise<Measurement> {
      return await this.stationService.getMeteoMeasurement();
    }

     /**
     * Can switch OFF or OFF a resource
     * 
     * @param resource : resource like (heater-state, led-state) 
     * @param switchState : ON or OFF
     */

    @Post('device/:resource')
    async switchresource(@Body() switchOnOFF: SwitchState, @Param('resource') resource: string ): Promise<void> {
      return await this.stationService.switchresource(resource,switchOnOFF);
    }

    /**
      * Restart registered meteo station
      */
    
    @Put('restart')
    async restart(): Promise<void> {
        return await this.stationService.restart();
    }
}
