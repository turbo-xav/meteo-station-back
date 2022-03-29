import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Meteo_Device } from 'src/models/device.entity';
import { Meteo_User } from 'src/models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meteo_User, Meteo_Device])],
  controllers: [UsersController],
  providers: [JwtStrategy, UsersService],
  exports: [],
})
export class UsersModule {}
