import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { CustomerAddress } from '../../customer_addresses/entities/customer_address.entity';
import { OrderItem } from '../../order_items/entities/order_item.entity';

@Entity('orders')
@Index('idx_orders_customer_address_id', ['customerAddressId'])
@Index('idx_orders_user_id', ['userId'])
@Check('chk_orders_status', `"status" IN ('reserved', 'paid', 'fulfilled')`)
export class Order {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'orders_pkey',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId!: number;

  @Column({ name: 'customer_address_id', type: 'integer', nullable: true })
  customerAddressId!: number | null;

  @Column({ type: 'date' })
  order_date!: Date;

  @Column({ type: 'varchar', length: 20, default: 'reserved' })
  status!: string;

  @Column({ type: 'varchar', length: 100 })
  delivery_street!: string;

  @Column({ type: 'varchar', length: 10 })
  delivery_number!: string;

  @Column({ type: 'varchar', length: 80 })
  delivery_neighborhood!: string;

  @Column({ type: 'varchar', length: 60 })
  delivery_city!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_orders_user',
  })
  user!: User;

  @ManyToOne(
    () => CustomerAddress,
    (customerAddress) => customerAddress.orders,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({
    name: 'customer_address_id',
    foreignKeyConstraintName: 'fk_orders_customer_address',
  })
  customer_address!: CustomerAddress | null;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items!: OrderItem[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
