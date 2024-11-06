import dotenv from 'dotenv';
dotenv.config();
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

// GoogleStrategy class, which extends PassportStrategy
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    // Injecting the authentication service through dependency injection (DI)
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ){
        // Calling the constructor of the base PassportStrategy class with the Google OAuth configuration
        super({
            clientID: process.env.CLIENT_ID, // Google OAuth client ID
            clientSecret: process.env.CLIENT_SECRET, // Google OAuth client secret
            callbackURL: 'http://localhost:9090/api/auth/google/redirect', // Redirect URL after authentication
            scope: ['profile', 'email'], // Requested permissions — access to profile and email
        });
    }

    // The validate method is called after successful Google OAuth authentication and returns user data
    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        // Logging the accessToken, refreshToken, and profile
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);

        // Calling the validatuser method from authService to find or create a user
        const user = await this.authService.validatuser({
            email: profile.emails[0].value, // Extracting email from the profile
            name: profile.displayName       // Extracting user's name from the profile
        });

        // Logging validation results
        console.log('Validate');
        console.log(user);
        
        // Returning the user if found or created, or null otherwise
        return user || null;
    }
}
