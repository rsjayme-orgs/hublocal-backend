import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaUsersRepository } from '../users/repositories/implementations/prisma-users-repository';
import { UsersRepository } from '../users/repositories/users-repository';
import { SessionsController } from './controllers/sessions.controller';
import { CreateSessionUseCase } from './use-cases/create-session-use-case';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JWT_CONSTANTS } from 'src/shared/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

const EXPIRES_IN = 60 * 60 * 24; // SECONDS IN 24 HOURS

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: JWT_CONSTANTS.secret,
            signOptions: { expiresIn: EXPIRES_IN },
        }),
    ],
    controllers: [SessionsController],
    providers: [
        CreateSessionUseCase,
        PrismaService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository,
        },
    ],
})
export class SessionModule {}
