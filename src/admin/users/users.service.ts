import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meteo_User } from 'src/models/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Meteo_User)
    private usersRepository: Repository<Meteo_User>,
  ) {}

  /**
   * Return users list
   */

  users(): Promise<Meteo_User[]> {
    return this.usersRepository.find();
  }

  /**
   * Return users by id
   */

  user(id: number): Promise<Meteo_User> {
    return this.usersRepository.findOne(id);
  }
}
