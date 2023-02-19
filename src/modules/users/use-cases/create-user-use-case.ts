import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { CreatedUserDTO } from '../dtos/created-user-dto';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
    }: CreateUserDTO): Promise<CreatedUserDTO> {
        const usersAlreadyExists = await this.usersRepository.findByEmail(
            email,
        );

        if (usersAlreadyExists) {
            throw new HttpException(
                'Usuário já cadastrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
