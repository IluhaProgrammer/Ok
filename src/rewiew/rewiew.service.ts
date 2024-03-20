import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/rewiew.dto';
import { ReturnRewiew } from './dto/rewiew.dto';

@Injectable()
export class RewiewService {

    constructor(private readonly prisma : PrismaService) {}

    async getAverageValueByProductId() {
        return this.prisma.rewiew.aggregate({
            _avg: {raiting: true}
        }).then(data => data._avg)
    }

    async createRewiew(userId : number, data : ReviewDto) {
        const rewiew = await this.prisma.rewiew.create({
            data: {
                ...data,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return {message : 'Отзыв успешно оставлен'}
    }

    async getAll() {
        const rewiews = await this.prisma.rewiew.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                ...ReturnRewiew
            }
        })

        return rewiews
    }

    async deleteAll() {
        const rewiews = await this.prisma.rewiew.deleteMany()

        return {message : 'Отзывы успешно удалены'}
    }

}
