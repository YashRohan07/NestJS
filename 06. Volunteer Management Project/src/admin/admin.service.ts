// src/admin/admin.service.ts

import { Injectable, UnauthorizedException, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common'; // Importing necessary NestJS exceptions and decorators
import { InjectRepository } from '@nestjs/typeorm'; // Importing TypeOrmModule to inject repositories
import { Repository } from 'typeorm'; // Importing the Repository class to interact with the database
import { Admin } from './admin.entity'; 
import { AdminDTO, AdminUpdateDTO, LoginDTO } from './admin.dto';
import { JwtService } from '@nestjs/jwt'; // Importing JwtService for token generation
import * as bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import { MailerService } from '@nestjs-modules/mailer'; // Importing MailerService to send emails

@Injectable() // Indicates that this class can be injected as a service
export class AdminService {
  constructor(
    @InjectRepository(Admin) // Injecting the Admin repository to interact with the Admin entity in the database
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService, // Injecting JwtService to generate JWT tokens
    private readonly mailerService: MailerService, // Injecting MailerService to send emails
  ) {}

  // Login method for authenticating an admin
  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDto; // Extract email and password from the DTO
    const admin = await this.adminRepository.findOneBy({ email }); // Find admin by email

    // If admin not found or password does not match, throw an unauthorized exception
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: admin.email, sub: admin.id }; // Create a JWT payload with the admin's email and ID
    const accessToken = this.jwtService.sign(payload); // Generate an access token
    return { accessToken }; // Return the access token
  }

  // Sign up method for registering a new admin
  async signUp(adminDTO: AdminDTO): Promise<object> {
    // Check if an admin with the given email already exists
    const existingAdmin = await this.adminRepository.findOneBy({ email: adminDTO.email });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists'); // Throw conflict exception if email is taken
    }

    const salt = await bcrypt.genSalt(); // Generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(adminDTO.password, salt); // Hash the password with the generated salt

    // Create a new admin entity
    const admin = this.adminRepository.create({
      ...adminDTO,
      password: hashedPassword, // Set the hashed password
    });

    await this.adminRepository.save(admin); // Save the new admin to the database
    return { message: 'Admin registered successfully', admin }; // Return a success message and the new admin
  }

  // A simple method to return a confirmation message
  async getAdmin(): Promise<object> {
    return { message: 'Yes Admin' }; // Return a hardcoded message
  }

  // Method to get an admin by ID
  async getAdminById(id: number): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ id }); // Find the admin by ID
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`); // Throw not found exception if the admin doesn't exist
    }
    return { admin }; // Return the found admin
  }

  // Method to get an admin by name and ID
  async getAdminByName(name: string, id: number): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ name, id }); // Find the admin by name and ID
    if (!admin) {
      throw new NotFoundException(`Admin with name ${name} and ID ${id} not found`); // Throw not found exception if the admin doesn't exist
    }
    return { admin }; // Return the found admin
  }

  // Method to get all admins
  async getAllAdmins(): Promise<object> {
    const admins = await this.adminRepository.find(); // Find all admins
    return { admins }; // Return the list of admins
  }

  // Method to add a new admin
  async addAdmin(adminDTO: AdminDTO): Promise<object> {
    // Check if an admin with the given email already exists
    const existingAdmin = await this.adminRepository.findOneBy({ email: adminDTO.email });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists'); // Throw conflict exception if email is taken
    }

    const hashedPassword = await bcrypt.hash(adminDTO.password, 10); // Hash the password with a salt rounds of 10
    // Create a new admin entity
    const admin = this.adminRepository.create({
      ...adminDTO,
      password: hashedPassword, // Set the hashed password
    });
    await this.adminRepository.save(admin); // Save the new admin to the database
    return { message: 'Admin added successfully', admin }; // Return a success message and the new admin
  }

  // Method to update an existing admin's information
  async updateAdmin(id: number, adminUpdateDTO: AdminUpdateDTO): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ id }); // Find the admin by ID
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`); // Throw not found exception if the admin doesn't exist
    }

    // If the password is being updated, hash the new password
    if (adminUpdateDTO.password) {
      adminUpdateDTO.password = await bcrypt.hash(adminUpdateDTO.password, 10);
    }

    await this.adminRepository.update(id, adminUpdateDTO); // Update the admin in the database
    return { message: 'Admin updated successfully', updatedAdminId: id }; // Return a success message
  }

  // A wrapper method for updateAdmin, allows calling updateAdminInfo with the same logic
  async updateAdminInfo(id: number, adminUpdateDTO: AdminUpdateDTO): Promise<object> {
    return this.updateAdmin(id, adminUpdateDTO); // Call the updateAdmin method
  }

  // Method to delete an admin by ID
  async deleteAdmin(id: number): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ id }); // Find the admin by ID
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`); // Throw not found exception if the admin doesn't exist
    }

    await this.adminRepository.delete(id); // Delete the admin from the database
    return { message: 'Admin deleted successfully', deletedAdminId: id }; // Return a success message
  }

  // Method to send an email
  async sendEmail(mydata: { email: string; subject: string; text: string }): Promise<void> {
    try {
      // Send the email using the MailerService
      await this.mailerService.sendMail({
        to: mydata.email,
        subject: mydata.subject,
        text: mydata.text,
        // Optional: HTML content if needed
        // html: `<p>${mydata.text}</p>`,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email'); // Throw an exception if email sending fails
    }
  }
}
