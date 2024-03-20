import { Prisma } from "@prisma/client"
import { IsString } from "class-validator"

export const ReturnCategory : Prisma.CategorySelect = {
    id: true,
    name: true,
    slug: true
}

export class CategoryDto {
    @IsString()
    name : string
}

export class SlugDto {
    @IsString()
    name : string

    @IsString()
    slug : string
}   