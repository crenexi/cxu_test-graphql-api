import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import SuperHero from '../SuperHero';

@Entity()
class SuperPower {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public ability!: string;

  @ManyToOne(() => SuperHero, superHero => superHero.power)
  public superHero!: SuperHero;
}

export default SuperPower;
