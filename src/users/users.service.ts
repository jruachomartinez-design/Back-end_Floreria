import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Role) private readonly roles: Repository<Role>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.register(createUserDto);
  }

  async register(dto: CreateUserDto): Promise<User> {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.users.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email is already registered');

    const role = await this.roles.findOne({ where: { name: 'customer' } });
    if (!role)
      throw new InternalServerErrorException('Customer role is not configured');

    const user = this.users.create({
      roleId: role.id,
      first_name: dto.first_name.trim(),
      last_name: dto.last_name.trim(),
      second_last_name: dto.second_last_name?.trim() || null,
      email,
      phone: dto.phone?.trim() || null,
      password_hash: await hash(dto.password, 12),
    });

    try {
      return await this.users.save(user);
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
