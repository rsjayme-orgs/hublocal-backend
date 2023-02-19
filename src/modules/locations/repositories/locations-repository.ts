import { CreateLocationDTO } from '../dtos/create-location-dto';
import { CreatedLocationDTO } from '../dtos/created-location-dto';
import { UpdateLocationDTO } from '../dtos/update-location-dto';

abstract class LocationRepository {
    abstract create(data: CreateLocationDTO): Promise<CreatedLocationDTO>;

    abstract list(user_id: number): Promise<CreatedLocationDTO[]>;

    abstract findById(id: number): Promise<CreatedLocationDTO | null>;

    abstract delete(id: number): Promise<void>;

    abstract update(
        id: number,
        data: UpdateLocationDTO,
    ): Promise<CreatedLocationDTO>;
}

export { LocationRepository };
