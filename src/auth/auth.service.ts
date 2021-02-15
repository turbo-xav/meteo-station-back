import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt  from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    
    private readonly JWT_SECRET_KEY: string; // <- replace this with your secret key

    constructor(
        private readonly configService: ConfigService
    ) {
        this.JWT_SECRET_KEY = this.configService.get('JWT_SECRET_KEY')
    };

    public verifyToken(token: string): any{        
        return jwt.verify(token,this.JWT_SECRET_KEY);        
    }

    async validateOAuthLogin(profile: Profile, provider: Provider): Promise<string>
    {
        try 
        {
            // You can add some registration logic here, 
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
            
            // if (!user)
                // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
                
            const payload = {
                profile,
                provider
            }
            console.log(payload);

            const token: string = jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
            return token;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }

     /**
   * Return user logged with google
   * @param req 
   */

  googleInfos(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

}