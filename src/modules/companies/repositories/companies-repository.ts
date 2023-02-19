import { CreateCompanyDTO } from '../dtos/create-company-dto';
import { CreatedCompanyDTO } from '../dtos/created-company-dto';
import { UpdateCompanyDTO } from '../dtos/update-company-dto';

abstract class CompaniesRepository {
    abstract create(data: CreateCompanyDTO): Promise<CreatedCompanyDTO>;

    abstract list(user_id: number): Promise<CreatedCompanyDTO[]>;

    abstract findById(id: number): Promise<CreatedCompanyDTO | null>;

    abstract findByCnpj(cnpj: string): Promise<CreatedCompanyDTO | null>;

    abstract delete(id: number): Promise<void>;

    abstract update(
        id: number,
        data: UpdateCompanyDTO,
    ): Promise<CreatedCompanyDTO>;
}

export { CompaniesRepository };
