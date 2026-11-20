import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  first_name!: string;

  @IsString()
  @MaxLength(50)
  last_name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  second_last_name?: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;
}
