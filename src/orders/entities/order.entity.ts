import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CustomerAddress } from '../../customer_addresses/entities/customer_address.entity';
import { OrderItem } from '../../order_items/entities/order_item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ type: 'varchar', length: 20, default: 'reserved' })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  delivery_street: string;

  @Column({ type: 'varchar', length: 10 })
  delivery_number: string;

  @Column({ type: 'varchar', length: 80 })
  delivery_neighborhood: string;

  @Column({ type: 'varchar', length: 60 })
  delivery_city: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CustomerAddress, (customerAddress) => customerAddress.orders)
  @JoinColumn({ name: 'customer_address_id' })
  customer_address: CustomerAddress;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
