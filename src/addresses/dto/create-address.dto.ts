import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    street!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    number!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    neighborhood!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    city!: string;
}
