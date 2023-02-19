import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (info?.message === 'No auth token') {
            throw new UnauthorizedException('Token inválido');
        }
        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Token inválido');
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
