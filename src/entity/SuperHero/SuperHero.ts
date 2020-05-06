import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import SuperPower from '../SuperPower';

@Entity()
class SuperHero {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(
    () => SuperPower,
    power => power.superHero,
    { eager: true, cascade: true },
  )
  public power!: SuperPower[];
}

export default SuperHero;
