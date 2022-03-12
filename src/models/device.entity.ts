import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Meteo_User } from './user.entity';

@Entity('meteo_device')
export class Meteo_Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thingerio_login: string;

  @Column()
  thingerio_bearer: string;

  @ManyToOne(() => Meteo_User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: Meteo_User;
}
