import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { CreatedUserDTO } from '../dtos/created-user-dto';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';

@Controller('users')
export class UsersController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post()
    async create(
        @Body() { name, email, password }: CreateUserDTO,
    ): Promise<CreatedUserDTO> {
        const user = await this.createUserUseCase.execute({
            name,
            email,
            password,
        });

        return user;
    }
}
