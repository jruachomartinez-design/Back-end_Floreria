import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFavoritesService } from './product_favorites.service';
import { ProductFavoritesController } from './product_favorites.controller';
import { ProductFavorite } from './entities/product_favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFavorite])],
  controllers: [ProductFavoritesController],
  providers: [ProductFavoritesService],
})
export class ProductFavoritesModule {}
