import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class AdminDTO {
    @IsNotEmpty()
    id: number;

    @IsString({ message: "Please enter a valid name" })
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
    name: string;

    @IsEmail({}, { message: "Please enter a valid email address" })
    @Matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, { message: "Email must be in a valid format" })
    email: string;

    @IsString({ message: "Please enter a valid password" })
    @MinLength(5, { message: "Password must be at least 5 characters long" })
    password: string;
}

export class AdminUpdateDTO {
    @IsString({ message: "Please enter a valid name" })
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
    name: string;

    @IsEmail({}, { message: "Please enter a valid email address" })
    @Matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, { message: "Email must be in a valid format" })
    email: string;

    @IsString({ message: "Please enter a valid password" })
    @MinLength(5, { message: "Password must be at least 5 characters long" })
    password: string;
}
