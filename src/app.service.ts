import { Injectable, Logger } from '@nestjs/common';
import { Hello } from './models/hello.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meteo_User } from './models/user.entity';
import { Meteo_Device } from './models/device.entity';

/**
 * This a simple service to say Hello
 */

@Injectable()
export class AppService {
  /**
   * Default logger
   *
   */

  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Meteo_User)
    private usersRepository: Repository<Meteo_User>,
    @InjectRepository(Meteo_Device)
    private deviceRepository: Repository<Meteo_Device>,
  ) {}

  /**
   * A method to say Hello
   */

  getHello(): Hello {
    this.logger.log('Try to return "Hello" message');
    return { message: 'Hello World! This my connected meteo station' };
  }

  async findAll(): Promise<Meteo_User[]> {
    const users = await this.usersRepository.find();
    this.logger.log(users, 'List of users');
    const devices = await this.deviceRepository.find();
    this.logger.log(devices, 'List of devices');
    return users;
  }
}
