import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('registers a user and returns a JWT without password data', async () => {
    const user = {
      id: 7,
      first_name: 'Ana',
      last_name: 'Lopez',
      second_last_name: null,
      email: 'ana@example.com',
      phone: null,
      password_hash: 'secret-hash',
    };
    const usersService = { register: jest.fn().mockResolvedValue(user) };
    const jwtService = { signAsync: jest.fn().mockResolvedValue('signed-token') };
    const service = new AuthService(usersService as any, jwtService as any);

    const result = await service.signup({
      first_name: 'Ana', last_name: 'Lopez', email: 'ana@example.com', password: 'longpassword',
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 7, role: 'customer' });
    expect(result).toEqual({
      access_token: 'signed-token',
      token_type: 'Bearer',
      user: {
        id: 7,
        first_name: 'Ana',
        last_name: 'Lopez',
        second_last_name: null,
        email: 'ana@example.com',
        phone: null,
        role: 'customer',
      },
    });
    expect(JSON.stringify(result)).not.toContain('secret-hash');
  });
});
