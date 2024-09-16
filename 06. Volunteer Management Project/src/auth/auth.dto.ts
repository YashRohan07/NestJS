//src/auth/auth.dto.ts
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class AuthDTO {
  @IsString()
  @Matches(/^[A-Za-z]+$/, { message: 'Please enter a valid name' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;
}
