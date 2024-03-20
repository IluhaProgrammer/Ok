import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnCategory, SlugDto } from './dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(private readonly prisma : PrismaService) {}

    async getCategory(id : string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: +id
            },
            select: {
                 ...ReturnCategory
            }
        })

        if(!category) {
            throw new NotFoundException('Такой категории не существует')
        }

        return category
    }

    async updateCategory(id : string, data : SlugDto) {
        const category = await this.prisma.category.update({
            where: {
                id: +id
            },
            data: {
                name: data.name,
                slug: data.slug
            },
            select: {
                ...ReturnCategory
            }
        })

        return category
    }

    async deleteCategory(id : string) {
        const category = await this.prisma.category.delete({
            where: {
                id: +id
            }
        })

        return {message: "Категория успешно удалена"}
    }

    async createCategory() {
        const category = await this.prisma.category.create({
            data: {
                name: '',
                slug: ''
            }
        })

        return category
    }

    async getAll() {
        const categories = await this.prisma.category.findMany({
            select: {
                ...ReturnCategory
            }
        })

        return categories
    }

}
