import { OrderStatus } from '@prisma/client'
import { ArrayMinSize, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class OrderItemDto {
    @IsNumber()
    quantity : number

    @IsNumber()
    price : number

    @IsNumber()
    productId : number

    @IsOptional()
    @IsNumber()
    userId : number

    @IsOptional()
    @IsString()
    text : string
    
    @IsOptional()
    @IsString()
    script : string

    @IsOptional()
    @IsString()
    color : string
}

export class OrderDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status : OrderStatus

    @ArrayMinSize(1)
    items : OrderItemDto[]
}