// src/event-manager/event-manager.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventManager } from './event-manager.entity';
import { EventManagerController } from './event-manager.controller';
import { EventManagerService } from './event-manager.service';

@Module({
  imports: [
    // Register the EventManager entity with TypeORM
    // This allows TypeORM to manage the EventManager repository
    TypeOrmModule.forFeature([EventManager]),
  ],
  // Register the EventManagerController for handling incoming requests related to EventManagers
  controllers: [EventManagerController],

  // Register the EventManagerService as a provider for business logic related to EventManagers
  providers: [EventManagerService],

  // Export the EventManagerService to make it available for injection in other modules
  exports: [EventManagerService],
})
export class EventManagerModule {}
