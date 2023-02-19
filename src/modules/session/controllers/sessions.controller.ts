import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../authguard/local-auth.guard';
import { CreateSessionUseCase } from '../use-cases/create-session-use-case';

@Controller('session')
export class SessionsController {
    constructor(private createSessionUseCase: CreateSessionUseCase) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async create(@Request() req) {
        return this.createSessionUseCase.login(req.user);
    }
}
