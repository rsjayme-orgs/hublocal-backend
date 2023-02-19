import { IsNotEmpty, Length, IsEmail } from 'class-validator';

class CreateUserDTO {
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    @Length(5, 100, {
        message: 'O nome deve ter entre 5 e 100 caracteres',
    })
    name: string;

    @IsNotEmpty({
        message: 'O email é obrigatório',
    })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({
        message: 'A senha é obrigatória',
    })
    @Length(8, 100, {
        message: 'A senha deve ter entre 8 e 20 caracteres',
    })
    password: string;
}

export { CreateUserDTO };
