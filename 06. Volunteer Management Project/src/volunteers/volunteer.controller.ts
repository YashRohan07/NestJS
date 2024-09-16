// src/volunteers/volunteer.controller.ts

import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDTO, UpdateVolunteerDTO } from './volunteer.dto';

@Controller('admin/volunteers')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async createVolunteer(@Body() createVolunteerDTO: CreateVolunteerDTO): Promise<object> {
    return this.volunteerService.createVolunteer(createVolunteerDTO);
  }

  @Get('viewAll')
  @UseGuards(JwtAuthGuard)
  async getAllVolunteers(): Promise<object> {
    return this.volunteerService.getAllVolunteers();
  }

  @Get('view/:id')
  @UseGuards(JwtAuthGuard)
  async getVolunteerById(@Param('id') id: number): Promise<object> {
    return this.volunteerService.getVolunteerById(id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateVolunteer(@Param('id') id: number, @Body() updateVolunteerDTO: UpdateVolunteerDTO): Promise<object> {
    return this.volunteerService.updateVolunteer(id, updateVolunteerDTO);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteVolunteer(@Param('id') id: number): Promise<object> {
    return this.volunteerService.removeVolunteer(id);
  }
}
