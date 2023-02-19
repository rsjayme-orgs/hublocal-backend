import { Module } from '@nestjs/common';
import { CompanyModule } from './modules/companies/companies.module';
import { LocationModule } from './modules/locations/locations.module';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/users/user.module';

@Module({
    imports: [SessionModule, UserModule, CompanyModule, LocationModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
