import { PartialType } from '@nestjs/mapped-types';
import { CreateProductFavoriteDto } from './create-product_favorite.dto';

export class UpdateProductFavoriteDto extends PartialType(CreateProductFavoriteDto) {}
