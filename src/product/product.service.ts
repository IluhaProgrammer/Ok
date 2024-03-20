import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto, ReturnProduct } from './dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnumProductSort, GetAllProductDto } from './dto/filter.product.dto';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class ProductService {

    constructor(private readonly prisma : PrismaService, private pagination : PaginationService) {}

    async createProduct() {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                slug: '',
                price: 0,
                images: ['']
            },
            select: {
                ...ReturnProduct
            }
        })

        return product
    }

    async updateProduct(id : string, data : ProductDto) {
        const {description, categoryId, name, images, price, slug} = data

        const product = await this.prisma.product.update({
            where: {
                id: +id
            },
            data: {
                description,
                price,
                images,
                name,
                slug,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return product
    }

    async deleteProduct(id : string) {
        const product = await this.prisma.product.delete({
            where: {
                id: +id
            }
        })

        return {message : 'Товар успешно удален'}
    }

    async getByName(name : string) {
        const product = await this.prisma.product.findFirst({
            where: {
                name
            },
            select: {
                ...ReturnProduct
            }
        })

        return product
    }

    async getByCategory(categorySlug : string) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug : categorySlug
                }
            },
            select : {
                ...ReturnProduct
            }
        })

        if(!products) {
            throw new NotFoundException('Товары с таким слагом не найдены')
        }

        return products
    }

    async getById(id : string) {
        const product = await this.prisma.product.findUnique({
            where:{
                id: +id
            },
            select: {
                ...ReturnProduct
            }
        })

        return product
    }

    async getAall(dto : GetAllProductDto) {
        const {sort, searchTerm} = dto

        const prismaSort : Prisma.ProductOrderByWithRelationInput[] = []

        if(sort === EnumProductSort.LOW_PRICE) {
            prismaSort.push({price: 'asc'})
        } else if(sort === EnumProductSort.HIGH_PRICE) {
            prismaSort.push({price: 'desc'})
        } else if(sort === EnumProductSort.OLDEST) {
            prismaSort.push({createdAt: 'asc'})
        } else prismaSort.push({categoryId: 'desc'})

        const {limit, page} = this.pagination.getPagination(dto)

        const products = await this.prisma.product.findMany({
            orderBy: prismaSort,
            take: limit,
            select: {
                ...ReturnProduct
            }
        })

        return {
            products,
            length: await this.prisma.product.count()
        }
    }   
}
