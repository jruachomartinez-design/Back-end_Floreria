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

import { Category } from '../../categories/entities/category.entity';
import { ProductFavorite } from '../../product_favorites/entities/product_favorite.entity';
import { OrderItem } from '../../order_items/entities/order_item.entity';

@Entity('products')
@Index('idx_products_category_id', ['categoryId'])
@Check('chk_products_price', '"price" >= 0')
@Check('chk_products_stock', '"stock" >= 0')
export class Product {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'products_pkey',
  })
  id!: number;

  @Column({ name: 'category_id', type: 'integer' })
  categoryId!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: string;

  @Column({ type: 'integer' })
  stock!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'fk_products_category',
  })
  category!: Category;

  @OneToMany(
    () => ProductFavorite,
    (productFavorite) => productFavorite.product,
  )
  product_favorites!: ProductFavorite[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items!: OrderItem[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
