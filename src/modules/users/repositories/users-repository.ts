import { CreateUserDTO } from '../dtos/create-user-dto';
import { CreatedUserDTO } from '../dtos/created-user-dto';

abstract class UsersRepository {
    abstract create(data: CreateUserDTO): Promise<CreatedUserDTO>;

    abstract findByEmail(email: string): Promise<CreatedUserDTO>;

    abstract findById(id: number): Promise<CreatedUserDTO>;
}

export { UsersRepository };
