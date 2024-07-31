import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDTO, AdminUpdateDTO } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>, // Inject Admin repository
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
    const admin = this.adminRepository.create(adminDTO);
    await this.adminRepository.save(admin);
    return { message: 'Admin added successfully', admin };
  }

  async updateAdmin(adminUpdateDTO: AdminUpdateDTO, id: number): Promise<object> {
    await this.adminRepository.update(id, adminUpdateDTO);
    return { message: 'Admin updated successfully', updatedAdminId: id };
  }

  async updateAdminInfo(id: number, adminUpdateDTO: AdminUpdateDTO): Promise<object> {
    await this.adminRepository.update(id, adminUpdateDTO);
    return { message: 'Admin info updated successfully', updatedAdminId: id };
  }

  async deleteAdmin(id: number): Promise<object> {
    await this.adminRepository.delete(id);
    return { message: 'Admin deleted successfully', deletedAdminId: id };
  }
}
