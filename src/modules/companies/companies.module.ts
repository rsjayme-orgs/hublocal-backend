import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaUsersRepository } from '../users/repositories/implementations/prisma-users-repository';
import { UsersRepository } from '../users/repositories/users-repository';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesRepository } from './repositories/companies-repository';
import { PrismaCompaniesRepository } from './repositories/implementations/prisma-companies-repository';
import { CreateCompanyUseCase } from './use-cases/create-company-use-case';
import { DeleteCompanyUseCase } from './use-cases/delete-company-use-case';
import { ListCompaniesUseCase } from './use-cases/list-companies-use-case';
import { UpdateCompanyUseCase } from './use-cases/update-company-use-case';

@Module({
    controllers: [CompaniesController],
    providers: [
        CreateCompanyUseCase,
        ListCompaniesUseCase,
        UpdateCompanyUseCase,
        DeleteCompanyUseCase,
        PrismaService,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository,
        },
        {
            provide: CompaniesRepository,
            useClass: PrismaCompaniesRepository,
        },
    ],
})
export class CompanyModule {}
