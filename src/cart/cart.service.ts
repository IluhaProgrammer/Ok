import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartAddDto } from './dto/cart.dto';
import { ReturnUser, returnCart } from 'src/user/dto/use.dto';

@Injectable()
export class CartService {

    constructor(private readonly prisma : PrismaService){}

    async addToCart(dto : CartAddDto, name : string, userId : number) {

        const newAddCart = await this.prisma.orderItems.create({
            data: {
                price: dto.price,
                color: dto.color,
                script: dto.script,
                text: dto.text,
                quantity: 1
            }
        })

        const user =  await this.prisma.user.findUnique({
            where: {
                id : userId
            },
            select: {
                ...ReturnUser,
                carts: {
                    select : {
                        ...returnCart
                    }
                }
            }
        })

        if(!user) {
            throw new UnauthorizedException('Ошибка регистрации')
        }

        await this.prisma.user.update({
            where: {
                id : userId
            },
            data: {
                carts: { 
                    connect: {
                        id : newAddCart.id
                    }
                }
            }
        })
    }

    async resetCart(userId : number) {
        await this.prisma.user.update({
            where: {
                id : userId
            },
            data: {
                carts: {
                    deleteMany:{}
                }
            }
        })

        return 'Корзина успешно очищена'
    }

    async delFromCart(userId : number, productId : number) {
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                carts: {
                    delete: {
                        id: productId
                    }
                }
            }
        })

        return 'Товар успешно удален из корзины'
    }

}
