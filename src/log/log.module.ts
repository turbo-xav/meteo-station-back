import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
        transports: [
          // Default console output
          new winston.transports.Console(),
          // Record info into a file wich is deleted on each start of application
          new winston.transports.File({
            filename:
              configService.get('LOGGER_FILE') !== undefined
                ? configService.get('LOGGER_FILE')
                : 'log.info',
            options: { flags: 'w' },
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class LogModule {}
