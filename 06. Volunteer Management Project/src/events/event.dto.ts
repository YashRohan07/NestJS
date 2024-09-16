// src/events/event.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateEventDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateEventDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
