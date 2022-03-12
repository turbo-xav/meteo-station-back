import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Meteo_Device } from './device.entity';

@Entity('meteo_user')
export class Meteo_User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  role: 'ADMIN' | 'USER' = 'USER';

  @OneToMany(() => Meteo_Device, (device) => device.user)
  photos: Meteo_Device[];
}
