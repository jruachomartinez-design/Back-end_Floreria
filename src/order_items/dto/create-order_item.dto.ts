import { IsInt, IsPositive, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
    @IsInt()
    @IsPositive()
    quantity!: number;

    @IsNumber()
    @Min(0)
    unit_price!: number;

    @IsInt()
    @IsPositive()
    orderId!: number;

    @IsInt()
    @IsPositive()
    productId!: number;
}