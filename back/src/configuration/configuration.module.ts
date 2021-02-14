import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StationHttpModule } from 'src/http/station-http.module';

@Module({
    imports: [
        ConfigModule.forRoot({ 
            isGlobal: true ,            
            envFilePath: process.env.NODE_ENV == 'dev'?'.env':['.env.prod','.env']
        })        
    ]    
})
export class ConfigurationModule { }
