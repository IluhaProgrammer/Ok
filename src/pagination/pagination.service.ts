import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {

    constructor(private readonly prisma : PrismaService) {}

    getPagination(data : PaginationDto, defaultLimit : number = 30) {
        const page = data.page ? +data.page : 1
        const limit = data.limit ? +data.limit : defaultLimit

        const skip = (page - 1) * limit

        return {page, limit}
    }

}
