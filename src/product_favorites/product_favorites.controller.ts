import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productFavoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateProductFavoriteDto: UpdateProductFavoriteDto) {
    return this.productFavoritesService.update(+id, updateProductFavoriteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productFavoritesService.remove(+id);
  }
}
