import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { CreatedLocationDTO } from '../dtos/created-location-dto';
import { UpdateLocationDTO } from '../dtos/update-location-dto';
import { LocationRepository } from '../repositories/locations-repository';

@Injectable()
export class UpdateLocationUseCase {
    constructor(
        private locationsRepository: LocationRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute(
        id: number,
        {
            name,
            city,
            neighborhood,
            number,
            state,
            street,
            zipcode,
            user_id,
        }: UpdateLocationDTO,
    ): Promise<CreatedLocationDTO> {
        const location = await this.locationsRepository.findById(id);

        if (!location || location.company.user_id !== user_id) {
            throw new HttpException(
                'Local não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        const locationUpdated = await this.locationsRepository.update(id, {
            name,
            city,
            neighborhood,
            number,
            state,
            street,
            zipcode,
        });

        return locationUpdated;
    }
}
