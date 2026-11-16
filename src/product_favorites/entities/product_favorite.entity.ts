import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('product_favorites')
@Unique('uq_product_favorites_pair', ['userId', 'productId'])
@Index('idx_product_favorites_product_id', ['productId'])
export class ProductFavorite {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'product_favorites_pkey',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId!: number;

  @Column({ name: 'product_id', type: 'integer' })
  productId!: number;

  @ManyToOne(() => User, (user) => user.product_favorites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_product_favorites_user',
  })
  user!: User;

  @ManyToOne(() => Product, (product) => product.product_favorites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'fk_product_favorites_product',
  })
  product!: Product;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
