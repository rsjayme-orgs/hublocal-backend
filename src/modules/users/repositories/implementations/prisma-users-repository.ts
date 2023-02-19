import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateUserDTO } from '../../dtos/create-user-dto';
import { CreatedUserDTO } from '../../dtos/created-user-dto';
import { UsersRepository } from '../users-repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}
    async create({
        name,
        email,
        password,
    }: CreateUserDTO): Promise<CreatedUserDTO> {
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    }

    async findByEmail(email: string): Promise<CreatedUserDTO> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });
    }

    async findById(id: number): Promise<CreatedUserDTO> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            },
        });
    }
}
