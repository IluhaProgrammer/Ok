import { Prisma } from "@prisma/client";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { ReturnUser } from "src/user/dto/use.dto";

export class ReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    raiting : number

    @IsString()
    text : string

    @IsString()
    order : string
}


export const ReturnRewiew : Prisma.RewiewSelect = {
    id : true,
    createdAt: true,
    raiting: true,
    text: true,
    order: true,
    user: {
        select: {
            ...ReturnUser
        }
    }
}



