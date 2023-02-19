import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCompanyDTO } from '../../dtos/create-company-dto';
import { CreatedCompanyDTO } from '../../dtos/created-company-dto';
import { UpdateCompanyDTO } from '../../dtos/update-company-dto';
import { CompaniesRepository } from '../companies-repository';

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
    constructor(private prisma: PrismaService) {}
    async create({
        cnpj,
        name,
        website,
        user_id,
    }: CreateCompanyDTO): Promise<CreatedCompanyDTO> {
        return this.prisma.companies.create({
            data: {
                name,
                website,
                cnpj,
                user_id,
            },
            select: {
                id: true,
                name: true,
                website: true,
                cnpj: true,
                locations: {
                    select: {
                        id: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    async list(user_id: number): Promise<CreatedCompanyDTO[]> {
        return this.prisma.companies.findMany({
            where: {
                user_id,
            },
            select: {
                id: true,
                name: true,
                website: true,
                cnpj: true,
                locations: {
                    select: {
                        id: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    async findById(id: number): Promise<CreatedCompanyDTO | null> {
        return this.prisma.companies.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                website: true,
                cnpj: true,
                locations: {
                    select: {
                        id: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    async findByCnpj(cnpj: string): Promise<CreatedCompanyDTO | null> {
        return this.prisma.companies.findUnique({
            where: {
                cnpj,
            },
            select: {
                id: true,
                name: true,
                website: true,
                cnpj: true,
                locations: {
                    select: {
                        id: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.companies.delete({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        { name, cnpj, website }: UpdateCompanyDTO,
    ): Promise<CreatedCompanyDTO> {
        return this.prisma.companies.update({
            where: {
                id,
            },
            data: {
                name,
                cnpj,
                website,
            },
            select: {
                id: true,
                name: true,
                website: true,
                cnpj: true,
                locations: {
                    select: {
                        id: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                    },
                },
                user_id: false,
            },
        });
    }
}
