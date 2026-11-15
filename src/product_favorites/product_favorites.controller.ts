import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductFavoritesService } from './product_favorites.service';
import { CreateProductFavoriteDto } from './dto/create-product_favorite.dto';
import { UpdateProductFavoriteDto } from './dto/update-product_favorite.dto';

@Controller('product-favorites')
export class ProductFavoritesController {
  constructor(private readonly productFavoritesService: ProductFavoritesService) {}

  @Post()
  create(@Body() createProductFavoriteDto: CreateProductFavoriteDto) {
    return this.productFavoritesService.create(createProductFavoriteDto);
  }

  @Get()
  findAll() {
    return this.productFavoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productFavoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductFavoriteDto: UpdateProductFavoriteDto) {
    return this.productFavoritesService.update(+id, updateProductFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productFavoritesService.remove(+id);
  }
}
