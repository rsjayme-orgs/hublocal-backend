import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLocationDTO } from '../../dtos/create-location-dto';
import { CreatedLocationDTO } from '../../dtos/created-location-dto';
import { UpdateLocationDTO } from '../../dtos/update-location-dto';

import { LocationRepository } from '../locations-repository';

@Injectable()
export class PrismaLocationsRepository implements LocationRepository {
    constructor(private prisma: PrismaService) {}
    async create({
        city,
        neighborhood,
        number,
        state,
        street,
        zipcode,
        name,
        company_id,
    }: CreateLocationDTO): Promise<CreatedLocationDTO> {
        return this.prisma.locations.create({
            data: {
                name,
                city,
                neighborhood,
                number,
                state,
                street,
                zipcode,
                company_id,
            },
            select: {
                id: true,
                name: true,
                city: true,
                neighborhood: true,
                number: true,
                state: true,
                street: true,
                zipcode: true,
                company: {
                    select: {
                        id: true,
                        user_id: true,
                    },
                },
            },
        });
    }

    async list(company_id: number): Promise<CreatedLocationDTO[]> {
        return this.prisma.locations.findMany({
            where: {
                company_id,
            },
            select: {
                id: true,
                name: true,
                city: true,
                neighborhood: true,
                number: true,
                state: true,
                street: true,
                zipcode: true,
                company: {
                    select: {
                        id: true,
                        user_id: true,
                    },
                },
            },
        });
    }

    async findById(id: number): Promise<CreatedLocationDTO | null> {
        return this.prisma.locations.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                city: true,
                neighborhood: true,
                number: true,
                state: true,
                street: true,
                zipcode: true,
                company: {
                    select: {
                        id: true,
                        user_id: true,
                    },
                },
            },
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.locations.delete({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        {
            name,
            city,
            neighborhood,
            number,
            state,
            street,
            zipcode,
        }: UpdateLocationDTO,
    ): Promise<CreatedLocationDTO> {
        return await this.prisma.locations.update({
            where: {
                id,
            },
            data: {
                name,
                city,
                neighborhood,
                number,
                state,
                zipcode,
                street,
            },
            select: {
                id: true,
                name: true,
                city: true,
                neighborhood: true,
                number: true,
                state: true,
                street: true,
                zipcode: true,
                company: {
                    select: {
                        id: true,
                        user_id: true,
                    },
                },
            },
        });
    }
}
