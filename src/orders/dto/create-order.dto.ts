import { IsString, IsDate, MaxLength, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
    @IsDate()
    order_date!: Date;

    @IsString()
    @MaxLength(20)
    @MinLength(1)
    status!: string;

    @IsString()
    @MaxLength(100)
    @MinLength(1)
    delivery_street!: string;

    @IsString()
    @MaxLength(10)
    @MinLength(1)
    delivery_number!: string;

    @IsString()
    @MaxLength(80)
    @MinLength(1)
    delivery_neighborhood!: string;
    
    @IsString()
    @MaxLength(60)
    @MinLength(1)
    delivery_city!: string;

    @IsInt()
    @IsPositive()
    userId!: number;

    @IsInt()
    @IsPositive()
    customerAddressId!: number;
}
