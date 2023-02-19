import { IsNotEmpty, Validate } from 'class-validator';
import { CustomCepValidator } from 'src/shared/utils/validators/CustomCepValidator';

class UpdateLocationDTO {
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    name: string;

    @IsNotEmpty({
        message: 'A rua é obrigatória',
    })
    street: string;

    @IsNotEmpty({
        message: 'O CEP é obrigatório',
    })
    @Validate(CustomCepValidator)
    zipcode: string;

    @IsNotEmpty({
        message: 'O Bairro é obrigatório',
    })
    neighborhood: string;

    @IsNotEmpty({
        message: 'O Número é obrigatório',
    })
    number: number;

    @IsNotEmpty({
        message: 'A Cidade é obrigatória',
    })
    city: string;

    @IsNotEmpty({
        message: 'O Estado é obrigatório',
    })
    state: string;

    user_id?: number;
}

export { UpdateLocationDTO };
