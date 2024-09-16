// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerModule } from './volunteers/volunteer.module';
import { EventManagerModule } from './event-manager/event-manager.module';
import { SponsorModule } from './sponsors/sponsor.module';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    // Load environment variables from .env file and make them available globally
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Import other feature modules
    AdminModule,         // Handles admin-related functionality
    AuthModule,          // Provides authentication and authorization
    VolunteerModule,     // Manages volunteer-related operations
    EventManagerModule,  // Manages event manager operations
    SponsorModule,       // Manages sponsor-related operations
    EventModule,          // Manages event-related operations


    // Configure TypeORM with PostgreSQL database
    TypeOrmModule.forRoot({
      type: 'postgres',  // Database type
      host: process.env.DATABASE_HOST,  // Database host from environment variables
      port: parseInt(process.env.DATABASE_PORT, 10),  // Database port, converted to integer
      username: process.env.DATABASE_USER,  // Database username from environment variables
      password: process.env.DATABASE_PASS,  // Database password from environment variables
      database: process.env.DATABASE_NAME,  // Database name from environment variables
      autoLoadEntities: true,  // Automatically load entities from modules
      synchronize: true,  // Automatically synchronize database schema with entities (useful in development)
    }),
  ],
  controllers: [],  // No global controllers in this module
  providers: [],    // No global providers in this module
})
export class AppModule {}
