import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { CreatedCompanyDTO } from '../dtos/created-company-dto';
import { UpdateCompanyDTO } from '../dtos/update-company-dto';
import { CompaniesRepository } from '../repositories/companies-repository';

@Injectable()
export class UpdateCompanyUseCase {
    constructor(
        private companiesRepository: CompaniesRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute(
        id: number,
        { name, cnpj, user_id, website }: UpdateCompanyDTO,
    ): Promise<CreatedCompanyDTO> {
        const takenCnpj = await this.companiesRepository.findByCnpj(cnpj);

        const companyExists = await this.companiesRepository.findById(id);

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

        if (takenCnpj && cnpj !== companyExists.cnpj) {
            throw new HttpException(
                'Empresa já cadastrada',
                HttpStatus.BAD_REQUEST,
            );
        }

        const company = await this.companiesRepository.update(id, {
            cnpj,
            name,
            website,
        });

        return company;
    }
}
