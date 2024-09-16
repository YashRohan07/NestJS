import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorController } from './sponsor.controller';
import { SponsorService } from './sponsor.service';
import { Sponsor } from './sponsor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sponsor]), // This allows SponsorService to use TypeORM's repository to interact with the Sponsor entity
  ],
  controllers: [
    SponsorController, // Register the SponsorController to handle incoming requests
  ],
  providers: [
    SponsorService, // This service can be injected into other classes such as controllers or other services
  ],
  exports: [
    SponsorService, // Export the SponsorService to make it available in other modules that import SponsorModule
  ],
})
export class SponsorModule {}
