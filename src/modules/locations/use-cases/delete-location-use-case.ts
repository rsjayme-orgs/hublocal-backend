import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories/locations-repository';

interface IDeleteLocationUseCaseProps {
    location_id: number;
    user_id: number;
}

@Injectable()
export class DeleteLocationUseCase {
    constructor(private locationsRepository: LocationRepository) {}

    async execute({
        location_id,
        user_id,
    }: IDeleteLocationUseCaseProps): Promise<void> {
        const location = await this.locationsRepository.findById(location_id);

        if (!location || location.company.user_id !== user_id) {
            throw new HttpException(
                'Local não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.locationsRepository.delete(location_id);
    }
}
