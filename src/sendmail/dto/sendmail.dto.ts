import { OrderItems } from "@prisma/client";
import { ArrayMinSize, IsNumber, IsString } from "class-validator";

export class SendEmailDto {
    @IsString()
    email : string

    @IsString()
    fullName : string

    @IsString()
    address : string

    @IsString()
    phone : string

    @IsString()
    deliver : string

    @IsString()
    payment : string

    @IsNumber()
    totalPrice : number

    @ArrayMinSize(1)
    cartProducts : OrderItems[]
}