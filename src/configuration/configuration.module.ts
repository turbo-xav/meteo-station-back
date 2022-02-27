import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Meteo_User } from '../models/user.entity';
import { Meteo_Device } from '../models/device.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'dev' ? '.env' : ['.env.prod', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('BDD_TYPE'),
          host: configService.get<string>('BDD_HOST'),
          port: configService.get<number>('BDD_PORT'),
          username: configService.get<string>('BDD_USER'),
          password: configService.get<string>('BDD_PASS'),
          database: configService.get<string>('BDD_BASE'),
          entities: [Meteo_User, Meteo_Device],
          synchronize: false,
          ssl: true,
          logging: true,
          extra: {
            ssl: {
              ca: fs.readFileSync(
                configService.get<string>('BDD_CERT'),
                'utf8',
              ),
            },
          },
        } as TypeOrmModuleOptions),
    }),
  ],
})
export class ConfigurationModule {}
