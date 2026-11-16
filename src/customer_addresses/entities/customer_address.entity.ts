import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('customer_addresses')
@Unique('uq_customer_addresses_pair', ['userId', 'addressId'])
@Index('idx_customer_addresses_address_id', ['addressId'])
export class CustomerAddress {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'customer_addresses_pkey',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId!: number;

  @Column({ name: 'address_id', type: 'integer' })
  addressId!: number;

  @ManyToOne(() => User, (user) => user.customer_addresses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_customer_addresses_user',
  })
  user!: User;

  @ManyToOne(() => Address, (address) => address.customer_addresses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'address_id',
    foreignKeyConstraintName: 'fk_customer_addresses_address',
  })
  address!: Address;

  @OneToMany(() => Order, (order) => order.customer_address)
  orders!: Order[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
