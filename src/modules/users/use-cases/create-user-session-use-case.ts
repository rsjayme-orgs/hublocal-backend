import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CreateUserSessionDTO } from '../dtos/create-user-session-dto';
import { CreatedUserDTO } from '../dtos/created-user-dto';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class CreateUserSessionUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
        password: passwordProp,
    }: CreateUserSessionDTO): Promise<CreatedUserDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const hashedPassword = await compare(passwordProp, user.password);

        if (!hashedPassword) {
            return null;
        }

        delete user.password;

        return user;
    }
}
