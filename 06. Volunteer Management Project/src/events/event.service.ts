// src/events/event.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDTO: CreateEventDTO): Promise<object> {
    const existingEvent = await this.eventRepository.findOneBy({ title: createEventDTO.title });
    if (existingEvent) {
      throw new ConflictException('Event with this title already exists');
    }

    const event = this.eventRepository.create(createEventDTO);
    await this.eventRepository.save(event);
    return { message: 'Event created successfully', event };
  }

  async updateEvent(id: number, updateEventDTO: UpdateEventDTO): Promise<object> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventRepository.update(id, updateEventDTO);
    const updatedEvent = await this.eventRepository.findOneBy({ id });

    return { message: 'Event updated successfully', event: updatedEvent };
  }

  async deleteEvent(id: number): Promise<object> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  
    await this.eventRepository.delete(id);
    return { message: 'Event deleted successfully', deletedEventId: id };
  }

  async getEventById(id: number): Promise<object> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return { message: 'Event retrieved successfully', event };
  }

  async getAllEvents(): Promise<object> {
    const events = await this.eventRepository.find();
    if (events.length === 0) {
      throw new NotFoundException('No events found');
    }
    return { message: 'Events retrieved successfully', events };
  }
}
