import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UsersController } from './controllers/users.controller';
import { PrismaUsersRepository } from './repositories/implementations/prisma-users-repository';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';

@Module({
    controllers: [UsersController],
    providers: [
        CreateUserUseCase,
        PrismaService,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository,
        },
    ],
})
export class UserModule {}
