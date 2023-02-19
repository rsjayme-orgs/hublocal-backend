import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { CreatedCompanyDTO } from '../dtos/created-company-dto';
import { CompaniesRepository } from '../repositories/companies-repository';

interface IListCompaniesProps {
    user_id: number;
}

@Injectable()
export class ListCompaniesUseCase {
    constructor(
        private companiesRepository: CompaniesRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        user_id,
    }: IListCompaniesProps): Promise<CreatedCompanyDTO[]> {
        if (!user_id)
            throw new HttpException(
                'É necessário informar o id do usuário',
                HttpStatus.BAD_REQUEST,
            );

        const usersExists = await this.usersRepository.findById(user_id);

        if (!usersExists) {
            throw new HttpException(
                'Usuário não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        const companies = await this.companiesRepository.list(user_id);

        return companies;
    }
}
