import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SponsorService } from './sponsor.service';
import { CreateSponsorDTO, UpdateSponsorDTO } from './sponsor.dto';

@Controller('admin/sponsors')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async createSponsor(@Body() createSponsorDTO: CreateSponsorDTO): Promise<object> {
    return this.sponsorService.createSponsor(createSponsorDTO);
  }

  @Get('viewAll')
  @UseGuards(JwtAuthGuard)
  async getAllSponsors(): Promise<object> {
    return this.sponsorService.getAllSponsors();
  }

  @Get('view/:id')
  @UseGuards(JwtAuthGuard)
  async getSponsorById(@Param('id') id: number): Promise<object> {
    return this.sponsorService.getSponsorById(id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateSponsor(@Param('id') id: number, @Body() updateSponsorDTO: UpdateSponsorDTO): Promise<object> {
    return this.sponsorService.updateSponsor(id, updateSponsorDTO);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSponsor(@Param('id') id: number): Promise<object> {
    return this.sponsorService.removeSponsor(id);
  }
}
