import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

// SessionSerializer extends PassportSerializer
@Injectable()
export class SessionSerializer extends PassportSerializer{
    //Injecting the AuthService for access to authentication-related methods
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
     ) {    
        super(); // Calling the base class constructor
        }
        //serializeUser method stores user information in the session
        serializeUser(user: User, done: Function) {
            console.log('Serialize User');
            done(null, user); //// Stores the entire user object (or selected parts) in the session
        }
        // deserializeUser method retrieves the user from the session and reconstructs it
        async deserializeUser(payload: any, done: Function) {
            //Fetches the user data based on the unique identifier in the payload (e.g., user ID)
            const user = this.authService.findUser(payload.id);
            console.log('Deserialize User');
            console.log(user);

            // If the user is found, it completes with the user object, otherwise it returns null
            return user ? done(null, user) : done(null,null);
        }

}   