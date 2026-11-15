import { Injectable } from '@nestjs/common';
import { CreateProductFavoriteDto } from './dto/create-product_favorite.dto';
import { UpdateProductFavoriteDto } from './dto/update-product_favorite.dto';

@Injectable()
export class ProductFavoritesService {
  create(createProductFavoriteDto: CreateProductFavoriteDto) {
    return 'This action adds a new productFavorite';
  }

  findAll() {
    return `This action returns all productFavorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productFavorite`;
  }

  update(id: number, updateProductFavoriteDto: UpdateProductFavoriteDto) {
    return `This action updates a #${id} productFavorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} productFavorite`;
  }
}
