import { Prisma } from "@prisma/client";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export const returnOrder : Prisma.OrderSelect = {
    id : true,
    OrderItems: true,
    status : true,
    createdAt : true
}

export const ReturnUser : Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
    avatarPath: true,
    password: false,
    phone: true
}

export const returnFavorite = {
    id: true,
    name: true,
    price: true,
    images: true,
    slug: true
}

export const returnCart : Prisma.OrderItemsSelect = {
    id : true,
    price : true,
    quantity : true,
    text : true,
    script : true,
    color : true
}

export class UpdateDto {
    @IsOptional()
    @IsString()
    email : string

    @IsOptional()
    @IsString()
    password : string

    @IsOptional()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    avatarPath : string

    @IsOptional()
    @IsString()
    phone : string
}