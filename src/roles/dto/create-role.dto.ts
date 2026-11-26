import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @MaxLength(30)
    @MinLength(1)
    name!: string;
}
