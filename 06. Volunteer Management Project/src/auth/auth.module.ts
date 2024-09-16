// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service'; // Import the AuthService for authentication logic
import { AuthController } from './auth.controller'; // Import the AuthController to handle authentication routes
import { JwtStrategy } from './jwt.strategy'; // Import the JWT strategy for handling JWT-based authentication
import { Admin } from '../admin/admin.entity'; // Import the Admin entity for database interactions
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService for environment-based configuration

@Module({
  imports: [
    // Register the Admin entity with TypeORM to use in this module
    TypeOrmModule.forFeature([Admin]),
    
    // Register PassportModule with the default strategy set to 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // Register JwtModule asynchronously to use configuration for JWT secret
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to load environment variables
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Set JWT secret from environment variable
        signOptions: { expiresIn: '1h' }, // Set JWT expiration time to 1 hour
      }),
    }),
  ],

  // Controllers to register
  controllers: [AuthController], // Register AuthController to handle authentication routes

  // Providers to register
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy to handle authentication logic and JWT validation

  // Exports to make services and modules available to other modules
  exports: [AuthService, JwtModule, JwtStrategy, PassportModule], // Export AuthService, JwtModule, JwtStrategy, and PassportModule for use in other modules
})
export class AuthModule {}
