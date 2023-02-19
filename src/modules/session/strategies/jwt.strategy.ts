import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANTS } from 'src/shared/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret,
        });
    }

    async validate(payload: { sub: string; email: string }) {
        return { id: payload.sub, email: payload.email };
    }
}
