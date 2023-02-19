import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/session/authguard/jwt-auth.guard';
import { CreateCompanyDTO } from '../dtos/create-company-dto';
import { CreatedCompanyDTO } from '../dtos/created-company-dto';
import { UpdateCompanyDTO } from '../dtos/update-company-dto';
import { CreateCompanyUseCase } from '../use-cases/create-company-use-case';
import { DeleteCompanyUseCase } from '../use-cases/delete-company-use-case';
import { ListCompaniesUseCase } from '../use-cases/list-companies-use-case';
import { UpdateCompanyUseCase } from '../use-cases/update-company-use-case';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly createCompanyUseCase: CreateCompanyUseCase,
        private readonly listCompaniesUseCase: ListCompaniesUseCase,
        private readonly updateCompanyUseCase: UpdateCompanyUseCase,
        private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() { name, cnpj, website }: CreateCompanyDTO,
        @Request() { user },
    ): Promise<CreatedCompanyDTO> {
        return await this.createCompanyUseCase.execute({
            name,
            cnpj,
            user_id: user.id,
            website,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Request() { user }): Promise<CreatedCompanyDTO[]> {
        return await this.listCompaniesUseCase.execute({
            user_id: Number(user.id),
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param() params,
        @Body() { name, cnpj, website }: UpdateCompanyDTO,
        @Request() { user },
    ): Promise<CreatedCompanyDTO> {
        const { id } = params;

        return await this.updateCompanyUseCase.execute(Number(id), {
            cnpj,
            name,
            website,
            user_id: Number(user.id),
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params, @Request() { user }): Promise<void> {
        const { id } = params;

        await this.deleteCompanyUseCase.execute({
            user_id: Number(user.id),
            company_id: Number(id),
        });
    }
}
