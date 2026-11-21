import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const user = await this.usersService.register(dto);
    return this.createSession(user, 'customer');
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithRole(dto.email);
    if (!user || !(await compare(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createSession(user, user.role.name);
  }

  private async createSession(
    user: {
      id: number;
      first_name: string;
      last_name: string;
      second_last_name: string | null;
      email: string;
      phone: string | null;
    },
    role: string,
  ) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role,
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
        role,
      },
    };
  }
}
