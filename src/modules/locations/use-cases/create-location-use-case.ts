import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesRepository } from 'src/modules/companies/repositories/companies-repository';
import { CreateLocationDTO } from '../dtos/create-location-dto';
import { CreatedLocationDTO } from '../dtos/created-location-dto';
import { LocationRepository } from '../repositories/locations-repository';

@Injectable()
export class CreateLocationUseCase {
    constructor(
        private locationsRepository: LocationRepository,
        private companiesRepository: CompaniesRepository,
    ) {}

    async execute({
        name,
        city,
        neighborhood,
        number,
        state,
        street,
        zipcode,
        company_id,
        user_id,
    }: CreateLocationDTO): Promise<CreatedLocationDTO> {
        const company = await this.companiesRepository.findById(company_id);

        if (!company || company.user.id !== user_id) {
            throw new HttpException(
                'Empresa não encotrada',
                HttpStatus.BAD_REQUEST,
            );
        }

        const location = await this.locationsRepository.create({
            name,
            city,
            neighborhood,
            number,
            state,
            street,
            zipcode,
            company_id,
        });

        return location;
    }
}
