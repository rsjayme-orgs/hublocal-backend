import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { CreateCompanyDTO } from '../dtos/create-company-dto';
import { CreatedCompanyDTO } from '../dtos/created-company-dto';
import { CompaniesRepository } from '../repositories/companies-repository';

@Injectable()
export class CreateCompanyUseCase {
    constructor(
        private companiesRepository: CompaniesRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        name,
        cnpj,
        user_id,
        website,
    }: CreateCompanyDTO): Promise<CreatedCompanyDTO> {
        const companyExists = await this.companiesRepository.findByCnpj(cnpj);

        const usersExists = await this.usersRepository.findById(user_id);

        if (!usersExists) {
            throw new HttpException(
                'Usuário não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (companyExists) {
            throw new HttpException(
                'Empresa já cadastrada',
                HttpStatus.BAD_REQUEST,
            );
        }

        const company = await this.companiesRepository.create({
            name,
            cnpj,
            website,
            user_id,
        });

        return company;
    }
}
