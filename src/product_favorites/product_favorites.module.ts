import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFavoritesService } from './product_favorites.service';
import { ProductFavoritesController } from './product_favorites.controller';
import { ProductFavorite } from './entities/product_favorite.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFavorite, User, Product])],
  controllers: [ProductFavoritesController],
  providers: [ProductFavoritesService],
  exports: [ProductFavoritesService],
})
export class ProductFavoritesModule {}