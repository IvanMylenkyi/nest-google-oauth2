import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/Guards";
import { Request } from "express";


@Controller('auth')
export class AuthController {
    // api/auth/google/login
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin(){
        return {msg: "google auth"}
    }

    // api/auth/google/redirect
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect(){
        return {msg: "OK"}
    }

    // api/auth/status
    @Get('status')
    user(@Req() request: Request){
        console.log(request.user);
        if (request.user){
            return {msg: "Authenticated" };
         }  else{
            return {msg: 'Not Authenticated'}
        }
        }
    }

