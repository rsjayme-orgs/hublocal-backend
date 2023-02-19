import { IsNotEmpty, Validate } from 'class-validator';
import { CustomCnpjValidator } from 'src/shared/utils/validators/CustomCnpjValidator';

class UpdateCompanyDTO {
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    name: string;

    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    website: string;

    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    @Validate(CustomCnpjValidator)
    cnpj: string;

    user_id?: number;
}

export { UpdateCompanyDTO };
