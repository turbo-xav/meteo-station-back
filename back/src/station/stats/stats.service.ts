import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeteoStats } from './models/meteo-stats.entity';

/**
  * This service is called to get alls stats
  */

@Injectable()
export class StatsService {

  /**
    * Root URL of API 
    */

  private readonly rootUrl: string;
  
  /**
    * Buckets url of API
    */

  private readonly rootUrlBuckets: string;
  
  /**
    * Buckets h24
    */
  
  private readonly bucketH24: string;

  /**
    * Bucket daily 
    */

  private readonly bucketDaily: string


  /**
   * Constructor
   * 
   * @param httpService : http service to call REST IOT API
   * @param configService  : config service to get URL paths
   */

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.rootUrl = this.configService.get('THINGER_IO_API_URL');
    this.rootUrlBuckets = this.rootUrl + this.configService.get('THINGER_IO_API_BUCKETS_PATH');
    this.bucketH24 = this.configService.get('THINGER_IO_BUCKET_H24');
    this.bucketDaily = this.configService.get('THINGER_IO_BUCKET_DAILY');
  }

  /**
   * Get the realtime stats
   */

  public async getRealtimeStats(): Promise<MeteoStats> {    
    const url = `${this.rootUrlBuckets}/${this.bucketH24}/data`;    
    const response = await this.httpService.get(`${url}`).toPromise();
    return response.data;
  }

  /**
   * Get the daily stats
   */

  public async getDailyStats(): Promise<MeteoStats> {
    const url = `${this.rootUrlBuckets}/${this.bucketDaily}/data`;
    const response = await this.httpService.get(`${url}`).toPromise();
    return response.data;
  }
}
