import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUser, UpdateDto } from './dto/use.dto';
import { returnFavorite, returnCart } from './dto/use.dto';
import { ReturnCategory } from 'src/category/dto/category.dto';
import { returnOrder } from './dto/use.dto';
import { hash } from 'argon2';
import { ReturnRewiew } from 'src/rewiew/dto/rewiew.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma : PrismaService) {}

    async getProfile(id : number, selectodj : Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                ...ReturnUser,
                favorites: {
                    select: {
                        ...returnFavorite,
                        category: {
                            select: {
                                ...ReturnCategory
                            }
                        },
                    }
                },
                orders: {
                    select: {
                        ...returnOrder
                    }
                },
                carts: {
                    select: {
                        ...returnCart
                    }
                },
                rewiews: {
                    select: {
                        ...ReturnRewiew
                    }
                },
                ...selectodj
            }
        })

        if(!user) {
            throw new NotFoundException('Пользователя с таким id не существует')
        }

        return user
    }

    async updateProfile(userId : number, data : UpdateDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new NotFoundException('Пользователя с таким email не существует')
        }

        const updateUser = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email: data?.email,
                name: data?.name,
                phone: data?.phone,
                password: data?.password ? await hash(data?.password) : user?.password,
                avatarPath: data?.avatarPath
            }
        })

        return updateUser
    }

    async toggleFavorites(productId : number, userId : number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                favorites: {
                    select: {
                        ...returnFavorite
                    }
                }
            }
        })

        if(!user) {
            throw new NotFoundException('Пользователя с таким id не существует')
        }

        const isExist = user.favorites.some(product => product.id === productId)

        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favorites: {
                    [isExist ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        })

        return {message: 'Товар успешно добавлен/удален'}
    }

}
