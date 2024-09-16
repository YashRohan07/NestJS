import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventManager } from './event-manager.entity';
import { CreateEventManagerDTO, UpdateEventManagerDTO } from './event-manager.dto';

@Injectable()
export class EventManagerService {
  constructor(
    @InjectRepository(EventManager)
    private readonly eventManagerRepository: Repository<EventManager>,
  ) {}

  // Create a new event manager
  async createEventManager(createEventManagerDTO: CreateEventManagerDTO): Promise<object> {
    // Check if an event manager with the given email already exists
    const existingEventManager = await this.eventManagerRepository.findOneBy({ email: createEventManagerDTO.email });

    if (existingEventManager) {
      // Throw a conflict exception if the email already exists
      throw new ConflictException('Event manager with this email already exists');
    }

    // Create a new event manager entity
    const eventManager = this.eventManagerRepository.create(createEventManagerDTO);

    // Save the new event manager entity to the database
    await this.eventManagerRepository.save(eventManager);
    return { message: 'Event manager created successfully', eventManager };
  }

  // Retrieve all event managers
  async getAllEventManagers(): Promise<object> {
    // Fetch all event managers
    const eventManagers = await this.eventManagerRepository.find(); 

    if (eventManagers.length === 0) {
      // Throw a not found exception if no event managers are found
      throw new NotFoundException('No event managers found');
    }
    return { message: 'Event managers retrieved successfully', eventManagers };
  }

  // Retrieve a specific event manager by ID
  async getEventManagerById(id: number): Promise<object> {
    // Fetch the event manager by ID
    const eventManager = await this.eventManagerRepository.findOneBy({ id });
    
    if (!eventManager) {
      // Throw a not found exception if the event manager is not found
      throw new NotFoundException(`Event manager with ID ${id} not found`);
    }
    return { message: 'Event manager retrieved successfully', eventManager };
  }

  // Update an existing event manager
  async updateEventManager(id: number, updateEventManagerDTO: UpdateEventManagerDTO): Promise<object> {
    // Fetch the existing event manager by ID
    const eventManager = await this.eventManagerRepository.findOneBy({ id });
    if (!eventManager) {
      // Throw a not found exception if the event manager is not found
      throw new NotFoundException(`Event manager with ID ${id} not found`);
    }

    // Update the event manager with the new data
    await this.eventManagerRepository.update(id, updateEventManagerDTO);
    // Fetch the updated event manager to include updated data
    const updatedEventManager = await this.eventManagerRepository.findOneBy({ id });

    return { message: 'Event manager updated successfully', eventManager: updatedEventManager };
  }

  // Delete an event manager
  async removeEventManager(id: number): Promise<object> {
    // Fetch the event manager by ID to ensure it exists before deletion
    const eventManager = await this.eventManagerRepository.findOneBy({ id });
    if (!eventManager) {
      // Throw a not found exception if the event manager is not found
      throw new NotFoundException(`Event manager with ID ${id} not found`);
    }

    // Delete the event manager from the database
    await this.eventManagerRepository.delete(id);
    return { message: 'Event manager deleted successfully', deletedEventManagerId: id };
  }
}
