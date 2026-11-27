import { IsInt, IsPositive } from 'class-validator';

export class CreateCustomerAddressDto {
    @IsInt()
    @IsPositive()
    userId!: number;

    @IsInt()
    @IsPositive()
    addressId!: number;
}
