import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionUseCase } from '../use-cases/create-session-use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private createSessionuseCase: CreateSessionUseCase) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.createSessionuseCase.execute({
            email,
            password,
        });

        if (!user) {
            throw new HttpException(
                'Usuário ou senha inválidos',
                HttpStatus.BAD_REQUEST,
            );
        }

        return user;
    }
}
