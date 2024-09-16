// src/volunteers/volunteer.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { CreateVolunteerDTO, UpdateVolunteerDTO } from './volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
  ) {}

  // Create a new volunteer
  async createVolunteer(createVolunteerDTO: CreateVolunteerDTO): Promise<object> {
    const existingVolunteerByEmail = await this.volunteerRepository.findOneBy({ email: createVolunteerDTO.email });
    const existingVolunteerByPhone = await this.volunteerRepository.findOneBy({ phone: createVolunteerDTO.phone });

    if (existingVolunteerByEmail || existingVolunteerByPhone) {
      throw new ConflictException('Volunteer with this email or phone already exists');
    }

    const volunteer = this.volunteerRepository.create(createVolunteerDTO);
    await this.volunteerRepository.save(volunteer);
    return { message: 'Volunteer created successfully', volunteer };
  }

  // Retrieve all volunteers
  async getAllVolunteers(): Promise<object> {
    const volunteers = await this.volunteerRepository.find();
    if (volunteers.length === 0) {
      throw new NotFoundException('No volunteers found');
    }
    return { message: 'Volunteers retrieved successfully', volunteers };
  }

  // Retrieve a specific volunteer by ID
  async getVolunteerById(id: number): Promise<object> {
    const volunteer = await this.volunteerRepository.findOneBy({ id });
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }
    return { message: 'Volunteer retrieved successfully', volunteer };
  }

  // Update an existing volunteer
  async updateVolunteer(id: number, updateVolunteerDTO: UpdateVolunteerDTO): Promise<object> {
    const volunteer = await this.volunteerRepository.findOneBy({ id });
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }

    await this.volunteerRepository.update(id, updateVolunteerDTO);
    const updatedVolunteer = await this.volunteerRepository.findOneBy({ id });

    return { message: 'Volunteer updated successfully', volunteer: updatedVolunteer };
  }

  // Delete a volunteer
  async removeVolunteer(id: number): Promise<object> {
    const volunteer = await this.volunteerRepository.findOneBy({ id });
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }

    await this.volunteerRepository.delete(id);
    return { message: 'Volunteer deleted successfully', deletedVolunteerId: id };
  }
}
