// src/events/event.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() createEventDTO: CreateEventDTO): Promise<object> {
    return this.eventService.createEvent(createEventDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  async updateEvent(@Param('id') id: number, @Body() updateEventDTO: UpdateEventDTO): Promise<object> {
    return this.eventService.updateEvent(id, updateEventDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteEvent(@Param('id') id: number): Promise<object> {
    return this.eventService.deleteEvent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('view/:id')
  async getEventById(@Param('id') id: number): Promise<object> {
    return this.eventService.getEventById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewAll')
  async getAllEvents(): Promise<object> {
    return this.eventService.getAllEvents();
  }
}
