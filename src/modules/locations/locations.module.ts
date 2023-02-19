import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CompaniesRepository } from 'src/modules/companies/repositories/companies-repository';
import { PrismaCompaniesRepository } from '../companies/repositories/implementations/prisma-companies-repository';
import { PrismaUsersRepository } from '../users/repositories/implementations/prisma-users-repository';
import { UsersRepository } from '../users/repositories/users-repository';
import { LocationsController } from './controllers/locations.controller';
import { PrismaLocationsRepository } from './repositories/implementations/prisma-locations-repository';
import { LocationRepository } from './repositories/locations-repository';
import { CreateLocationUseCase } from './use-cases/create-location-use-case';
import { DeleteLocationUseCase } from './use-cases/delete-location-use-case';
import { ListLocationsUseCase } from './use-cases/list-locations-use-case';
import { UpdateLocationUseCase } from './use-cases/update-location-use-case';

@Module({
    controllers: [LocationsController],
    providers: [
        CreateLocationUseCase,
        ListLocationsUseCase,
        UpdateLocationUseCase,
        DeleteLocationUseCase,
        PrismaService,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository,
        },

        {
            provide: LocationRepository,
            useClass: PrismaLocationsRepository,
        },

        {
            provide: CompaniesRepository,
            useClass: PrismaCompaniesRepository,
        },
    ],
})
export class LocationModule {}
