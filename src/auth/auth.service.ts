import {  Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserDetails } from "src/utils/types";

// expotr AuthService
@Injectable()
export class AuthService{
    constructor(private readonly prisma: PrismaService){} //set rights, var

    //validate user func
    async validatuser(details: UserDetails){ //set var
        //logging
        console.log('AuthService');
        console.log(details);
        //find user by email
        const user = await this.prisma.user.findUnique({ where: {email:details.email},
        });
        console.log(user); //logging

        if (user) return user; //if user exist - return user
        //else condition
        console.log("User not found. Creating..."); 
        //create new user
        const newUser = this.prisma.user.create({data: {
            email: details.email,
            name: details.name,
                }
            }
        );
        
        return newUser; //return newuser

    }   
    
    // find user by id
    async findUser(id:number ){
        //fing user
        const user = await this.prisma.user.findUnique({where:{id}});
        console.log(user); //logging
        return user; //return user
    }
}