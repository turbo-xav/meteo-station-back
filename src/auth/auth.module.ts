import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [     
    ],
    controllers: [],
    providers: [
        AuthService,
        GoogleStrategy,        
        JwtStrategy
    ],
    exports:[
        AuthService
    ]
  })
export class AuthModule {}
