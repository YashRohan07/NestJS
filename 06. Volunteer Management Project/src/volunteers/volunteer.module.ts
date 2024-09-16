import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { Volunteer } from './volunteer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Volunteer]),  // Registers the Volunteer entity with TypeORM
  ],
  controllers: [VolunteerController],        // Registers VolunteerController
  providers: [VolunteerService],             // Registers VolunteerService as a provider
  exports: [VolunteerService],               // Exports VolunteerService to be used in other modules
})
export class VolunteerModule {}
