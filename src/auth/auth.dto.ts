import { IsEmail, MinLength, IsString, IsEmpty, IsNumber } from "class-validator";

export class AuthDto {
    @IsEmail()
    email : string

    @MinLength(6, {
        message: 'Password must be at leat 6 characterlong'
    })
    @IsString()
    password : string

    @IsString()
    phone : string

    @IsString()
    name : string
}



export class LogDto {
    @IsEmail()
    @IsString()
    email : string

    @MinLength(6, {
        message: 'Password must be at leat 6 characterlong'
    })
    @IsString()
    password : string
}


export class RefreshDto {
    @IsString()
    refreshToken : string
}