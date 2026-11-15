import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerAddress } from '../../customer_addresses/entities/customer_address.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  street: string;

  @Column({ type: 'varchar', length: 10 })
  number: string;

  @Column({ type: 'varchar', length: 80 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 60 })
  city: string;

  @OneToMany(() => CustomerAddress, (customerAddress) => customerAddress.user)
  customer_addresses: CustomerAddress[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
