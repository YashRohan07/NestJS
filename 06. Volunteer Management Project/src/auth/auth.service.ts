// src/auth/auth.service.ts

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/admin.entity';
import { AuthDTO } from './auth.dto';
import { AdminDTO, LoginDTO } from 'src/admin/admin.dto';

// Mark the class as injectable so it can be used as a provider in the NestJS dependency injection system
@Injectable()
export class AuthService {
  // Constructor for injecting dependencies
  constructor(
    // Inject the Admin repository to perform database operations on the Admin entity
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService, // Inject JwtService to handle JWT creation and validation
  ) {}

  // Method to handle user signup
  async signUp(adminDTO: AdminDTO): Promise<object> {
    // Check if an admin with the given email already exists
    const existingAdmin = await this.adminRepository.findOneBy({ email: adminDTO.email });
    if (existingAdmin) {
      // Throw an exception if an admin with this email already exists
      throw new ConflictException('Admin with this email already exists');
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(); // Use explicit salt generation
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(adminDTO.password, salt); // Apply the generated salt

    // Create a new admin entity with the hashed password
    const admin = this.adminRepository.create({
      ...adminDTO,
      password: hashedPassword,
    });

    await this.adminRepository.save(admin);  // Save the new admin to the database
    return { message: 'Admin registered successfully', admin }; // Return a success message and the newly created admin
  }

  // Method to handle user login
  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    // Find an admin with the provided email
    const admin = await this.adminRepository.findOneBy({ email });

    // Check if the admin exists and if the provided password matches the stored password
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      // Throw an exception if the credentials are invalid
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create a JWT payload with the admin's email and ID
    const payload = { email: admin.email, sub: admin.id };
    const accessToken = this.jwtService.sign(payload); // Sign the JWT payload to generate an access token
    return { accessToken };  // Return the generated access token
  }
}
