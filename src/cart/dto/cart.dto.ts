import { Prisma } from "@prisma/client"
import { ArrayMaxSize, ArrayMinSize, IsNumber, IsOptional, IsString } from "class-validator"

export class CartAddDto {
    @IsString()
    @IsOptional()
    prodSlug : string

    @IsOptional()
    @IsString()
    color : string

    @IsString()
    @IsOptional()
    text : string

    @IsString()
    @IsOptional()
    script : string

    @IsNumber()
    @IsOptional()
    quantity : number

    @IsNumber()
    price : number

    @IsString()
    name : string

    @IsString()
    slug : string

    @ArrayMaxSize(4)
    images : string[]
}