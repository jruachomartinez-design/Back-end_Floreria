import { IsString, IsNumber, IsOptional, MaxLength, MinLength, IsBoolean, IsPositive, IsInt } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    name!: string;

    @IsOptional()
    description?: string;
    
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    image_url!: string;

    @IsNumber()
    price!: number; 

    @IsNumber()
    stock!: number; 

    @IsBoolean()    
    is_active!: boolean;

    @IsInt()
    @IsPositive()
    categoryId!: number;
}
