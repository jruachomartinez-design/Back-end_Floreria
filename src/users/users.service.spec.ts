import { NotFoundException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let users: {
    create: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
  };
  let roles: { findOne: jest.Mock };

  beforeEach(() => {
    users = {
      create: jest.fn((value) => value),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(async (value) => ({
        ...value,
        id: 5,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
      })),
      remove: jest.fn(),
    };
    roles = { findOne: jest.fn() };
    service = new UsersService(users as any, roles as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates customers with a password hash and omits it from the response', async () => {
    roles.findOne.mockResolvedValue({ id: 2, name: 'customer' });
    users.findOne.mockResolvedValue(null);

    const result = await service.create({
      first_name: ' Ana ',
      last_name: ' Lopez ',
      email: ' ANA@example.com ',
      password: 'longpassword',
    });

    const savedUser = users.save.mock.calls[0][0];
    expect(savedUser).toMatchObject({
      roleId: 2,
      first_name: 'Ana',
      last_name: 'Lopez',
      email: 'ana@example.com',
    });
    expect(await compare('longpassword', savedUser.password_hash)).toBe(true);
    expect(result).toMatchObject({ id: 5, role: 'customer' });
    expect(result).not.toHaveProperty('password_hash');
  });

  it('lists safe user records without password hashes', async () => {
    users.find.mockResolvedValue([
      {
        id: 7,
        first_name: 'Ana',
        last_name: 'Lopez',
        second_last_name: null,
        email: 'ana@example.com',
        phone: null,
        role: { name: 'customer' },
        password_hash: 'secret-hash',
      },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 7, role: 'customer' });
    expect(result[0]).not.toHaveProperty('password_hash');
  });

  it('returns not found for an unknown user id', async () => {
    users.findOne.mockResolvedValue(null);

    await expect(service.findOne(404)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
