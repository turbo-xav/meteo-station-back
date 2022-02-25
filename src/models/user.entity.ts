import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meteo_user')
export class Meteo_User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  mail: string;

  @Column()
  picture: string;

  @Column()
  role: 'ADMIN' | 'USER' = 'USER';
}
