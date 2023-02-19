import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cnpjValidator', async: false })
export class CustomCnpjValidator implements ValidatorConstraintInterface {
    validate(text: string) {
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

        return !!text.match(regexCnpj);
    }

    defaultMessage() {
        return 'CNPJ inválido';
    }
}
