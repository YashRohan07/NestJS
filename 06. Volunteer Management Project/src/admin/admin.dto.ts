// src/admin/admin.dto.ts

import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, IsOptional } from "class-validator"; 
// Import validation decorators from the 'class-validator' library

export class AdminDTO {
    @IsString({ message: "Please enter a valid name" }) // Ensures the name is a string
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" }) // Checks that the name contains only alphabetic characters
    name: string; // Property for admin's name

    @IsEmail({}, { message: "Please enter a valid email address" }) // Ensures the email is in a valid email format
    email: string; // Property for admin's email

    @IsString({ message: "Please enter a valid password" }) // Ensures the password is a string
    @MinLength(5, { message: "Password must be at least 5 characters long" }) // Checks that the password has a minimum length of 5 characters
    password: string; // Property for admin's password
}

export class AdminUpdateDTO {
    @IsOptional() // Indicates that this field is optional
    @IsString({ message: "Please enter a valid name" }) 
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" }) 
    name?: string; // Optional property for updating admin's name

    @IsOptional() // Indicates that this field is optional
    @IsEmail({}, { message: "Please enter a valid email address" }) 
    email?: string; // Optional property for updating admin's email

    @IsOptional() // Indicates that this field is optional
    @IsString({ message: "Please enter a valid password" }) 
    @MinLength(5, { message: "Password must be at least 5 characters long" }) 
    password?: string; // Optional property for updating admin's password
}

export class SignInDTO {
    @IsEmail({}, { message: "Please enter a valid email address" }) 
    email: string; 

    @IsString({ message: "Please enter a valid password" }) 
    password: string; 
}

export class LoginDTO {
    @IsEmail({}, { message: "Please enter a valid email address" }) 
    email: string; 

    @IsString({ message: "Please enter a valid password" }) 
    password: string; 
}
