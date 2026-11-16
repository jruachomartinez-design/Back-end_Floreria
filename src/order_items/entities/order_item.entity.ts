import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  Unique,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
@Unique('uq_order_items_pair', ['orderId', 'productId'])
@Index('idx_order_items_product_id', ['productId'])
@Check('chk_order_items_quantity', '"quantity" > 0')
@Check('chk_order_items_unit_price', '"unit_price" >= 0')
export class OrderItem {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'order_items_pkey',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'integer' })
  orderId!: number;

  @Column({ name: 'product_id', type: 'integer' })
  productId!: number;

  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  unit_price!: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'unit_price * quantity::numeric',
    insert: false,
    update: false,
    nullable: true,
  })
  subtotal!: string | null;

  @ManyToOne(() => Order, (order) => order.order_items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'fk_order_items_order',
  })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.order_items, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'fk_order_items_product',
  })
  product!: Product;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
