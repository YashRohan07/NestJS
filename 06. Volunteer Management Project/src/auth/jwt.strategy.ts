// src/auth/jwt.strategy.ts

// Import necessary decorators and classes from NestJS and Passport
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Service to access configuration variables
import { PassportStrategy } from '@nestjs/passport'; // Base class for Passport strategies
import { ExtractJwt, Strategy } from 'passport-jwt'; // Extract and Strategy classes for JWT handling

// Mark the class as injectable so it can be used as a provider in the NestJS dependency injection system
@Injectable()
// Define a class extending PassportStrategy with JWT strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Call the parent constructor with options for the JWT strategy
    super({
      // Extract JWT from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Set whether to ignore JWT expiration (false means JWT expiration will be checked)
      ignoreExpiration: false,
      // Get the secret key used to sign the JWT from the configuration service
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use the secret from .env
    });
  }

  // Method to validate the JWT payload
  async validate(payload: any) {
    // Return user information to be added to the request object
    // Adjust according to your JWT payload structure
    return { userId: payload.sub, username: payload.email };
  }
}
