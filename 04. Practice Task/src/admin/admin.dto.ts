import { IsIn, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min } from "class-validator"

export class Dto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fullname:string

    @IsNumber()
    @IsNotEmpty()
    age:number

    @IsString()
    @Matches(/^(active|inactive)$/)
    status?:string
}

export class StatusDTO{
    
    @IsString()
    @Matches(/^(active|inactive)$/)
    status:string
}