import { HttpService, Logger, Module, OnModuleInit, HttpModule as BaseHttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from './http.module';

@Module({
    imports: [
        BaseHttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              headers: {          
                Authorization: `Bearer ${configService.get('METEO_API_BEARER')}`
              },
              timeout: 7000,
              maxRedirects: 5
            }),
            inject: [ConfigService]
          }),  
        ConfigModule,      
    ],
    exports: [
        BaseHttpModule,
    ],
})
export class MeteoHttpModule extends HttpModule {   
}