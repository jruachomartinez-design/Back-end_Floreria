import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret || secret.length < 32) {
          //throw new Error('JWT_SECRET must be configured with at least 32 characters');
        }
        return {
          secret,
          signOptions: {
            //expiresIn: Number(config.get<string>('JWT_EXPIRES_IN_SECONDS') ?? 7200),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
