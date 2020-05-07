import { Entity, Column, OneToOne } from 'typeorm';
import Ship from '../Ship';

@Entity()
class ShipVariant extends Ship {
  @OneToOne(() => User, (user: User) => user.address)
  user: User;
}

export default ShipVariant;
