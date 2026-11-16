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

import { Role } from '../../roles/entities/role.entity';
import { CustomerAddress } from '../../customer_addresses/entities/customer_address.entity';
import { ProductFavorite } from '../../product_favorites/entities/product_favorite.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('users')
@Unique('uq_users_email', ['email'])
@Index('idx_users_role_id', ['roleId'])
export class User {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'users_pkey',
  })
  id!: number;

  @Column({ name: 'role_id', type: 'integer' })
  roleId!: number;

  @Column({ type: 'varchar', length: 50 })
  first_name!: string;

  @Column({ type: 'varchar', length: 50 })
  last_name!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  second_last_name!: string | null;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 255 })
  password_hash!: string;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'fk_users_role',
  })
  role!: Role;

  @OneToMany(() => CustomerAddress, (customerAddress) => customerAddress.user)
  customer_addresses!: CustomerAddress[];

  @OneToMany(() => ProductFavorite, (productFavorite) => productFavorite.user)
  product_favorites!: ProductFavorite[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
