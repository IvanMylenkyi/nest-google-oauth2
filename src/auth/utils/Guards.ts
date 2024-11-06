import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// GoogleAuthGuard extends AuthGuard
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

    // canActivate method checks whether the user is allowed to access the route
    async canActivate(context: ExecutionContext) { 
        // Calls the parent AuthGuard's canActivate method to authenticate the user
        // `activate` will be true if authentication is successful
        const activate = (await super.canActivate(context)) as boolean;

        // Get the request object from the ExecutionContext
        const request = context.switchToHttp().getRequest();

        // Log the user into the session (if session-based authentication is used)
        // This is needed to establish a session after successful authentication
        await super.logIn(request);

        // Return the result of the authentication check
        return activate;
    }
}
