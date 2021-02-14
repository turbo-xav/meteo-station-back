import { HttpService, Logger, Module, OnModuleInit, HttpModule as BaseHttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class HttpModule implements OnModuleInit {

    constructor(
        private readonly httpService: HttpService        
    ) { }

    public onModuleInit(): any {
        const logger = new Logger('Axios');
        // Add request interceptor and response interceptor to log request infos
        const axios = this.httpService.axiosRef;        
        axios.interceptors.request.use((config) => {            
            config['metadata'] = { ...config['metadata'], startDate: new Date() };
            return config;
        });
        axios.interceptors.response.use(
            (response) => {
               
                const { config } = response;
                config['metadata'] = { ...config['metadata'], endDate: new Date() };               
                const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();                
                logger.log(`Request : ${config.method.toUpperCase()} ${config.url} ${duration}ms : ${JSON.stringify(response.data)}`);
                return response;
            },
            (err) => {
                logger.error(err);
                // Don't forget this line like I did at first: it makes your failed HTTP requests resolve with "undefined" :-(
                return Promise.reject(err);
            });
    }
}