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
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'addresses_pkey',
  })
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  street!: string;

  @Column({ type: 'varchar', length: 10 })
  number!: string;

  @Column({ type: 'varchar', length: 80 })
  neighborhood!: string;

  @Column({ type: 'varchar', length: 60 })
  city!: string;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.address,
  )
  customer_addresses!: CustomerAddress[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
