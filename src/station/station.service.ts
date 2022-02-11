import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwitchState } from './models/switch-state.interface';
import { Measurement } from './models/mesurement.entity';

/**
 * This service can command registered meteo station
 */

@Injectable()
export class StationService {
  /**
   * Root URL of REST API IOT
   */

  private rootUrl: string;

  /**
   * Resource Path in URL
   */

  private resourcesUrl: string;

  /**
   * Devices path in URL
   */

  private devicesUrl: string;

  /**
   * Device ID of registered device
   */

  private deviceId: string;

  /**
   * Constructor
   *
   * @param httpService : http service to call REST IOT API
   * @param configService  : config service to get URL paths
   */

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.rootUrl = this.configService.get('THINGER_IO_API_URL');
    this.resourcesUrl = this.configService.get('THINGER_IO_API_RESOURCES_PATH');
    this.devicesUrl = this.configService.get('THINGER_IO_API_DEVICES_PATH');
    this.deviceId = this.configService.get('THINGER_IO_API_DEVICE_ID');
  }

  /**
   * Get list of connected devices
   */

  public async getDevices(): Promise<any> {
    const response = await this.httpService
      .get(`${this.rootUrl}${this.devicesUrl}`)
      .toPromise();
    return response.data;
  }

  /**
   * Get registered meteo station
   */

  public async getDevice(): Promise<any> {
    const response = await this.httpService
      .get(`${this.rootUrl}${this.devicesUrl}/${this.deviceId}`)
      .toPromise();
    return response.data;
  }

  /**
   * Get registered meteo station
   */

  public async getDeviceStats(): Promise<any> {
    const response = await this.httpService
      .get(`${this.rootUrl}${this.devicesUrl}/${this.deviceId}/stats`)
      .toPromise();
    return response.data;
  }

  /**
   * Can switch OFF or OFF a resource
   *
   * @param resource : resource like (heater-state, led-state)
   * @param switchState : ON or OFF
   */

  public async switchresource(
    resource: string,
    switchOnOFF: SwitchState,
  ): Promise<void> {
    const response = await this.httpService
      .post(`${this.rootUrl}${this.resourcesUrl}${resource}`, {
        in: switchOnOFF.state === 'ON',
      })
      .toPromise();
    return response.data;
  }
  /**
   * Get current state ON|OFF of resource
   *
   * @param resource : resource like (heater, led, screen)
   */

  public async getState(resource: string): Promise<SwitchState> {
    const response = await this.httpService
      .get(`${this.rootUrl}${this.resourcesUrl}${resource}-state`)
      .toPromise();
    return response.data;
  }

  /**
   * Get the the current meteo station measurement (temperature, pressure, humidity, ...)
   */

  public async getMeteoMeasurement(): Promise<Measurement> {
    const response = await this.httpService
      .get(`${this.rootUrl}${this.resourcesUrl}meteo`)
      .toPromise();
    return response.data;
  }

  /**
   * Restart connected registered meteo station
   */

  public async restart(): Promise<void> {
    await this.httpService
      .post(`${this.rootUrl}${this.resourcesUrl}reseting`)
      .toPromise();
  }
}
