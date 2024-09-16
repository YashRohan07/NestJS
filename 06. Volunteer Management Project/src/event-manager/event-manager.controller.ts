// src/event-manager/event-manager.controller.ts

import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the JwtAuthGuard for securing routes with JWT authentication
import { EventManagerService } from './event-manager.service';
import { CreateEventManagerDTO, UpdateEventManagerDTO } from './event-manager.dto';

// Define the controller and specify the base route for this controller
@Controller('admin/event-managers')
export class EventManagerController {
  // Inject the EventManagerService into the controller
  constructor(private readonly eventManagerService: EventManagerService) {}

  // Handle POST requests to '/admin/event-managers/create' for creating a new event manager
  @Post('create')
  @UseGuards(JwtAuthGuard) // Apply the JwtAuthGuard to secure this route with JWT authentication
  @UsePipes(new ValidationPipe()) // Use ValidationPipe to validate and transform the incoming request data
  async createEventManager(@Body() createEventManagerDTO: CreateEventManagerDTO): Promise<object> {
    return this.eventManagerService.createEventManager(createEventManagerDTO); // Call the service method to create an event manager and return the result
  }

  // Handle GET requests to '/admin/event-managers/viewAll' for retrieving all event managers
  @Get('viewAll')
  @UseGuards(JwtAuthGuard)
  async getAllEventManagers(): Promise<object> {
    return this.eventManagerService.getAllEventManagers();  // Call the service method to get all event managers and return the result
  }

  // Handle GET requests to '/admin/event-managers/view/:id' for retrieving a specific event manager by ID
  @Get('view/:id')
  @UseGuards(JwtAuthGuard)
  async getEventManagerById(@Param('id') id: number): Promise<object> {
    return this.eventManagerService.getEventManagerById(id); // Call the service method to get an event manager by ID and return the result
  }

  // Handle PUT requests to '/admin/event-managers/update/:id' for updating a specific event manager
  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateEventManager(@Param('id') id: number, @Body() updateEventManagerDTO: UpdateEventManagerDTO): Promise<object> {
    return this.eventManagerService.updateEventManager(id, updateEventManagerDTO); // Call the service method to update an event manager by ID and return the result
  }

  // Handle DELETE requests to '/admin/event-managers/delete/:id' for deleting a specific event manager
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteEventManager(@Param('id') id: number): Promise<object> {
    return this.eventManagerService.removeEventManager(id); // Call the service method to delete an event manager by ID and return the result
  }
}
