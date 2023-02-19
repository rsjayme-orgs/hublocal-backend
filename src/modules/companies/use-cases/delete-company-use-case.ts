import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/modules/users/repositories/users-repository';

import { CompaniesRepository } from '../repositories/companies-repository';

interface IDeleteCompanyUseCaseProps {
    company_id: number;

    user_id: number;
}

@Injectable()
export class DeleteCompanyUseCase {
    constructor(
        private companiesRepository: CompaniesRepository,

        private usersRepository: UsersRepository,
    ) {}

    async execute({
        company_id,

        user_id,
    }: IDeleteCompanyUseCaseProps): Promise<void> {
        const companyExists = await this.companiesRepository.findById(
            company_id,
        );

        const usersExists = await this.usersRepository.findById(user_id);

        if (!usersExists) {
            throw new HttpException(
                'Usuário não encontrado',

                HttpStatus.BAD_REQUEST,
            );
        }

        if (!companyExists || companyExists.user.id !== user_id) {
            throw new HttpException(
                'Empresa não encontrada',

                HttpStatus.BAD_REQUEST,
            );
        }

        await this.companiesRepository.delete(company_id);
    }
}
