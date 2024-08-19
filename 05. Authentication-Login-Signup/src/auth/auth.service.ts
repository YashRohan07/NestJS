// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/admin.entity';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async signUp(authDTO: AuthDTO): Promise<object> {
    const { name, email, password } = authDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = this.adminRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.adminRepository.save(admin);
    return { message: 'Admin registered successfully' };
  }

  async login(authDTO: AuthDTO): Promise<{ accessToken: string }> {
    const { email, password } = authDTO;
    const admin = await this.adminRepository.findOneBy({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
