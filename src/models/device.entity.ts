import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meteo_device')
export class Meteo_Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thingerio_login: string;

  @Column()
  thingerio_bearer: string;

  @Column()
  user_id: number;
}
