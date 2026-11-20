import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const user = await this.usersService.register(dto);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: 'customer',
    });

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name,
        email: user.email,
        phone: user.phone,
        role: 'customer',
      },
    };
  }
}
