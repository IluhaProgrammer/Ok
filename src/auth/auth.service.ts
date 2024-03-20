import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LogDto, RefreshDto } from './auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private readonly prisma : PrismaService, private readonly jwt : JwtService) {}

    async register(dto : AuthDto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(oldUser) {
            throw new BadRequestException('Пользователь с таким email уже существует')
        }

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                phone: dto.phone,
                name: dto.name,
                password: await hash(dto.password)
            }
        })

        const tokens = await this.issuesTokens(user.id)

        return {
            user: this.returnUserFileds(user),
            accesToken: tokens.accesToken,
            refreshToken: tokens.refreshToken
        }
    }

    async login(data : LogDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!user) {
            throw new NotFoundException('Пользователя с таким email не существует')
        }

        const validatePassword = await verify(user.password, data.password)

        if(!validatePassword) {
            throw new BadRequestException('Введен неверный пароль')
        }

        const tokens = await this.issuesTokens(user.id)

        return {
            user: this.returnUserFileds(user),
            accesToken: tokens.accesToken,
            refreshToken: tokens.refreshToken
        }
    }

    async getNewTokens(refreshToken : string) {
        const validToken = await this.jwt.verifyAsync(refreshToken)

        if(!validToken) {
            throw new UnauthorizedException('Невалидный токен')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: validToken.id
            }
        })

        if(!user) {
            throw new NotFoundException('Такого пользоветеля не существует')
        }

        const tokens = await this.issuesTokens(user.id)

        return {
            user: this.returnUserFileds(user),
            accesToken: tokens.accesToken,
            refreshToken: tokens.refreshToken
        }
    }

    private async issuesTokens(userId : number) {
        const data = {id : userId}

        const accesToken = this.jwt.sign(data, {expiresIn: '1h'})

        const refreshToken = this.jwt.sign(data, {expiresIn: '30d'})

        return {accesToken, refreshToken}
    }

    private returnUserFileds(user : User) {
        return {
            id: user.id,
            email: user.email
        }
    }
}
