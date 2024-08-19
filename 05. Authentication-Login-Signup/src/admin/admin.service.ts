// src/admin/admin.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDTO, AdminUpdateDTO, LoginDTO } from './admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async getAdmin(): Promise<object> {
    return { message: 'Yes Admin' };
  }

  async getAdminById(id: number): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ id });
    return { admin };
  }

  async getAdminByName(name: string, id: number): Promise<object> {
    const admin = await this.adminRepository.findOneBy({ name, id });
    return { admin };
  }

  async getAllAdmin(myobj: object): Promise<object> {
    const admins = await this.adminRepository.find();
    return { admins };
  }

  async addAdmin(adminDTO: AdminDTO): Promise<object> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminDTO.password, 10);
    const admin = this.adminRepository.create({
      ...adminDTO,
      password: hashedPassword,
    });
    await this.adminRepository.save(admin);
    return { message: 'Admin added successfully', admin };
  }

  async updateAdmin(adminUpdateDTO: AdminUpdateDTO, id: number): Promise<object> {
    if (adminUpdateDTO.password) {
      adminUpdateDTO.password = await bcrypt.hash(adminUpdateDTO.password, 10);
    }
    await this.adminRepository.update(id, adminUpdateDTO);
    return { message: 'Admin updated successfully', updatedAdminId: id };
  }

  async updateAdminInfo(id: number, adminUpdateDTO: AdminUpdateDTO): Promise<object> {
    if (adminUpdateDTO.password) {
      adminUpdateDTO.password = await bcrypt.hash(adminUpdateDTO.password, 10);
    }
    await this.adminRepository.update(id, adminUpdateDTO);
    return { message: 'Admin info updated successfully', updatedAdminId: id };
  }

  async deleteAdmin(id: number): Promise<object> {
    await this.adminRepository.delete(id);
    return { message: 'Admin deleted successfully', deletedAdminId: id };
  }

  async signUp(adminDTO: AdminDTO): Promise<object> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminDTO.password, 10);
    const admin = this.adminRepository.create({
      ...adminDTO,
      password: hashedPassword,
    });
    await this.adminRepository.save(admin);
    return { message: 'Admin registered successfully', admin };
  }

  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const admin = await this.adminRepository.findOneBy({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { email: admin.email, sub: admin.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
