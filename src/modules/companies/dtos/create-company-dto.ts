import { IsNotEmpty, Validate } from 'class-validator';
import { CustomCnpjValidator } from 'src/shared/utils/validators/CustomCnpjValidator';

class CreateCompanyDTO {
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    name: string;

    @IsNotEmpty({
        message: 'O website é obrigatório',
    })
    website: string;

    @IsNotEmpty({
        message: 'O CNPJ é obrigatório',
    })
    @Validate(CustomCnpjValidator)
    cnpj: string;

    user_id?: number;
}

export { CreateCompanyDTO };
