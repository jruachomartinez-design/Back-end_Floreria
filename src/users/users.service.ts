import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    return this.register(createUserDto).then((user) => this.toResponse(user));
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
      role,
      first_name: this.requiredText(dto.first_name, 'first_name'),
      last_name: this.requiredText(dto.last_name, 'last_name'),
      second_last_name: dto.second_last_name?.trim() || null,
      email,
      phone: dto.phone?.trim() || null,
      password_hash: await hash(dto.password, 12),
    });

    try {
      return await this.users.save(user);
    } catch (error) {
      if (this.databaseErrorCode(error) === '23505') {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  findByEmailWithRole(email: string): Promise<User | null> {
    return this.users.findOne({
      where: { email: email.trim().toLowerCase() },
      relations: { role: true },
    });
  }

  findByIdWithRole(id: number): Promise<User | null> {
    return this.users.findOne({
      where: { id },
      relations: { role: true },
    });
  }

  async findAll() {
    const users = await this.users.find({
      relations: { role: true },
      order: { id: 'ASC' },
    });
    return users.map((user) => this.toResponse(user));
  }

  async findOne(id: number) {
    const user = await this.users.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException(`User ${id} was not found`);
    return this.toResponse(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    if (!Object.values(dto).some((value) => value !== undefined)) {
      throw new BadRequestException('At least one field must be provided');
    }

    const user = await this.users.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException(`User ${id} was not found`);

    if (dto.first_name !== undefined) {
      user.first_name = this.requiredText(dto.first_name, 'first_name');
    }
    if (dto.last_name !== undefined) {
      user.last_name = this.requiredText(dto.last_name, 'last_name');
    }
    if (dto.second_last_name !== undefined) {
      user.second_last_name = dto.second_last_name?.trim() || null;
    }
    if (dto.email !== undefined) {
      const email = dto.email.trim().toLowerCase();
      const existing = await this.users.findOne({ where: { email } });
      if (existing && existing.id !== id) {
        throw new ConflictException('Email is already registered');
      }
      user.email = email;
    }
    if (dto.phone !== undefined) {
      user.phone = dto.phone?.trim() || null;
    }
    if (dto.password !== undefined) {
      user.password_hash = await hash(dto.password, 12);
    }

    try {
      return this.toResponse(await this.users.save(user));
    } catch (error) {
      if (this.databaseErrorCode(error) === '23505') {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} was not found`);

    try {
      await this.users.remove(user);
    } catch (error) {
      if (this.databaseErrorCode(error) === '23503') {
        throw new ConflictException(
          'User cannot be deleted because it has related records',
        );
      }
      throw error;
    }

    return { id, deleted: true };
  }

  private requiredText(value: unknown, field: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${field} must be a string`);
    }
    const trimmed = value.trim();
    if (!trimmed) throw new BadRequestException(`${field} cannot be empty`);
    return trimmed;
  }

  private databaseErrorCode(error: unknown): string | undefined {
    if (typeof error !== 'object' || error === null) return undefined;
    const databaseError = error as {
      code?: string;
      driverError?: { code?: string };
    };
    return databaseError.code ?? databaseError.driverError?.code;
  }

  private toResponse(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      second_last_name: user.second_last_name,
      email: user.email,
      phone: user.phone,
      role: user.role?.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
