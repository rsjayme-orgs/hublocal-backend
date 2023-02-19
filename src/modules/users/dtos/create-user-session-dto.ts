import { IsNotEmpty, IsEmail } from 'class-validator';

class CreateUserSessionDTO {
    @IsNotEmpty({ message: 'Email obrigatório ' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({ message: 'Senha obrigatória ' })
    password: string;
}

export { CreateUserSessionDTO };
