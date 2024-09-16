import { IsString, IsNotEmpty, IsEmail, IsOptional, IsInt } from 'class-validator';

// Data Transfer Object (DTO) for creating a new event manager
export class CreateEventManagerDTO {
  // The name of the event manager; must be a non-empty string
  @IsString()
  @IsNotEmpty()
  name: string;

  // The email of the event manager; must be a valid email address and non-empty
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // The phone number of the event manager; must be a non-empty string
  @IsString()
  @IsNotEmpty()
  phone: string;
}

// Data Transfer Object (DTO) for updating an existing event manager
export class UpdateEventManagerDTO {
  // Optional property for the name of the event manager; must be a string if provided
  @IsOptional()
  @IsString()
  name?: string;
  
  // Optional property for the email of the event manager; must be a valid email if provided
  @IsOptional()
  @IsEmail()
  email?: string;
  
  // Optional property for the phone number of the event manager; must be a string if provided
  @IsOptional()
  @IsString()
  phone?: string;
}
