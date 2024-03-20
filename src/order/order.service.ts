import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as YooKassa from 'yookassa';
import { OrderDto } from './dto/order.dto';


const yookassa = new YooKassa({
    shopId: process.env['SHOP_ID'],
    secretKey: process.env['SECRET_TOKEN']
})

@Injectable()
export class OrderService {

    constructor(private readonly prisma : PrismaService) {}

    async getAll(userId : number) {
        const orders = await this.prisma.order.findMany({
            where: {
                id: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return orders
    }

    async placeOrder(data : OrderDto, userId : number) {
        const order = await this.prisma.order.create({
            data: {
                status: data.status,
                OrderItems: {
                    create: []
                },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

        return order
    }

}
