import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreatedUserDTO } from 'src/modules/users/dtos/created-user-dto';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { CreateSessionDTO } from '../dtos/create-session-dto';

@Injectable()
export class CreateSessionUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async execute({
        email,
        password: passwordProp,
    }: CreateSessionDTO): Promise<CreatedUserDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new HttpException(
                'Usuário ou senha inválidos',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await compare(passwordProp, user.password);

        if (!hashedPassword) {
            throw new HttpException(
                'Usuário ou senha inválidos',
                HttpStatus.BAD_REQUEST,
            );
        }

        delete user.password;

        return user;
    }

    async login(user: CreatedUserDTO) {
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
