import { IsPositive, IsInt } from 'class-validator';

export class CreateProductFavoriteDto {
    @IsInt()
    @IsPositive()
    userId!: number;

    @IsInt()
    @IsPositive()
    productId!: number;
}
