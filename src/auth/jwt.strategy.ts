import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import { config } from 'dotenv';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    /**
     * 
     * @param authService 
     */

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY')
        });
    }

    async validate(payload, done: VerifyCallback)
    {
        try
        {
            done(null, payload);
        }
        catch (err)
        {
            throw new UnauthorizedException('unauthorized', err.message);
        }
    }

}