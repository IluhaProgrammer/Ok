import { Prisma } from "@prisma/client";
import { ArrayMaxSize, IsNumber, IsOptional, IsString } from "class-validator";
import { ReturnCategory } from "src/category/dto/category.dto";

export const ReturnProduct : Prisma.ProductSelect = {
    name: true,
    slug: true,
    price: true,
    id: true,
    images: true,
    createdAt: true,
    description: true,
    category: { 
        select: {
            ...ReturnCategory
        }
    }
}

export class ProductDto {
    @IsString()
    name : string
    
    @IsNumber()
    price : number

    @IsString()
    description : string

    @IsString({each: true})
    @ArrayMaxSize(4)
    @IsOptional()
    images : string[]

    @IsNumber()
    categoryId : number

    @IsOptional()
    @IsString()
    slug : string
}

