import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    UseGuards,
    Request,
    Param,
    Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/session/authguard/jwt-auth.guard';
import { CreateLocationDTO } from '../dtos/create-location-dto';
import { CreatedLocationDTO } from '../dtos/created-location-dto';
import { UpdateLocationDTO } from '../dtos/update-location-dto';
import { CreateLocationUseCase } from '../use-cases/create-location-use-case';
import { DeleteLocationUseCase } from '../use-cases/delete-location-use-case';
import { ListLocationsUseCase } from '../use-cases/list-locations-use-case';
import { UpdateLocationUseCase } from '../use-cases/update-location-use-case';

@Controller('locations')
export class LocationsController {
    constructor(
        private readonly createLocationUseCase: CreateLocationUseCase,
        private readonly listLocationsUseCase: ListLocationsUseCase,
        private readonly updateLocationUseCase: UpdateLocationUseCase,
        private readonly deleteLocationUseCase: DeleteLocationUseCase,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body()
        {
            name,
            city,
            company_id,
            neighborhood,
            number,
            state,
            street,
            zipcode,
        }: CreateLocationDTO,
        @Request() { user },
    ): Promise<CreatedLocationDTO> {
        const location = await this.createLocationUseCase.execute({
            name,
            user_id: user.id,
            city,
            company_id: Number(company_id),
            neighborhood,
            number: Number(number),
            state,
            street,
            zipcode,
        });

        return location;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':company_id')
    async list(
        @Request() { user },
        @Param() { company_id },
    ): Promise<CreatedLocationDTO[]> {
        const companies = await this.listLocationsUseCase.execute({
            company_id: Number(company_id),
            user_id: Number(user.id),
        });

        return companies;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param() params,
        @Body()
        {
            name,
            city,
            neighborhood,
            number,
            state,
            street,
            zipcode,
        }: UpdateLocationDTO,
        @Request() { user },
    ): Promise<CreatedLocationDTO> {
        const { id } = params;

        const updatedCompany = await this.updateLocationUseCase.execute(
            Number(id),
            {
                name,
                city,
                neighborhood,
                number: Number(number),
                state,
                street,
                zipcode,
                user_id: user.id,
            },
        );

        return updatedCompany;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params, @Request() { user }): Promise<void> {
        const { id } = params;

        await this.deleteLocationUseCase.execute({
            location_id: Number(id),
            user_id: user.id,
        });
    }
}
