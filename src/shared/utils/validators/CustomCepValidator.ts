import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cepValidator', async: false })
export class CustomCepValidator implements ValidatorConstraintInterface {
    validate(text: string) {
        const regexCnpj = /[0-9]{5}-[\d]{3}/;

        return !!text.match(regexCnpj);
    }

    defaultMessage() {
        return 'CEP inválido';
    }
}
