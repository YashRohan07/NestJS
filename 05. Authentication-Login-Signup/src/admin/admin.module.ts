// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { AuthModule } from '../auth/auth.module'; // Import the AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]), // Register the Admin entity
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule, // Import AuthModule to enable authentication functionality
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
