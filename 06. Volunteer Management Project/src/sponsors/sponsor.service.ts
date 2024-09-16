import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './sponsor.entity';
import { CreateSponsorDTO, UpdateSponsorDTO } from './sponsor.dto';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
  ) {}

  // Create a new sponsor
  async createSponsor(createSponsorDTO: CreateSponsorDTO): Promise<object> {
    const existingSponsorByEmail = await this.sponsorRepository.findOneBy({ email: createSponsorDTO.email });
    const existingSponsorByPhone = await this.sponsorRepository.findOneBy({ phone: createSponsorDTO.phone });

    if (existingSponsorByEmail || existingSponsorByPhone) {
      throw new ConflictException('Sponsor with this email or phone already exists');
    }

    const sponsor = this.sponsorRepository.create(createSponsorDTO);
    await this.sponsorRepository.save(sponsor);
    return { message: 'Sponsor created successfully', sponsor };
  }

  // Retrieve all sponsors
  async getAllSponsors(): Promise<object> {
    const sponsors = await this.sponsorRepository.find();
    if (sponsors.length === 0) {
      throw new NotFoundException('No sponsors found');
    }
    return { message: 'Sponsors retrieved successfully', sponsors };
  }

  // Retrieve a specific sponsor by ID
  async getSponsorById(id: number): Promise<object> {
    const sponsor = await this.sponsorRepository.findOneBy({ id });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return { message: 'Sponsor retrieved successfully', sponsor };
  }

  // Update an existing sponsor
  async updateSponsor(id: number, updateSponsorDTO: UpdateSponsorDTO): Promise<object> {
    const sponsor = await this.sponsorRepository.findOneBy({ id });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }

    await this.sponsorRepository.update(id, updateSponsorDTO);
    const updatedSponsor = await this.sponsorRepository.findOneBy({ id });

    return { message: 'Sponsor updated successfully', sponsor: updatedSponsor };
  }

  // Delete a sponsor
  async removeSponsor(id: number): Promise<object> {
    const sponsor = await this.sponsorRepository.findOneBy({ id });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }

    await this.sponsorRepository.delete(id);
    return { message: 'Sponsor deleted successfully', deletedSponsorId: id };
  }
}
