import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesRepository } from 'src/modules/companies/repositories/companies-repository';
import { CreatedLocationDTO } from '../dtos/created-location-dto';
import { LocationRepository } from '../repositories/locations-repository';

interface IListCompaniesProps {
    user_id: number;
    company_id: number;
}

@Injectable()
export class ListLocationsUseCase {
    constructor(
        private companiesRepository: CompaniesRepository,
        private locationsRepository: LocationRepository,
    ) {}

    async execute({
        company_id,
        user_id,
    }: IListCompaniesProps): Promise<CreatedLocationDTO[]> {
        const company = await this.companiesRepository.findById(company_id);

        if (!company || company.user.id !== user_id) {
            throw new HttpException(
                'Empresa não encontrada',
                HttpStatus.BAD_REQUEST,
            );
        }

        const locations = await this.locationsRepository.list(company_id);

        return locations;
    }
}
