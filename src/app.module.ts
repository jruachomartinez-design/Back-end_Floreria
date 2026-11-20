import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { getDatabaseOptions } from './database/database.config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { CustomerAddressesModule } from './customer_addresses/customer_addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductFavoritesModule } from './product_favorites/product_favorites.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      override: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => getDatabaseOptions(),
    }),
    RolesModule,
    UsersModule,
    AddressesModule,
    CustomerAddressesModule,
    CategoriesModule,
    ProductsModule,
    ProductFavoritesModule,
    OrdersModule,
    OrderItemsModule,
    AuthModule,
  ],
})
export class AppModule {}
