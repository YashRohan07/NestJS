import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateVolunteerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  // Add more fields as needed
}

export class UpdateVolunteerDTO {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    // Add more fields as needed
  }