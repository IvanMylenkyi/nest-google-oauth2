import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './auth.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaModule } from 'src/prisma.module';
import { SessionSerializer } from './utils/serializer';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [GoogleStrategy,SessionSerializer, {
        provide: 'AUTH_SERVICE',
        useClass: AuthService,
    },
],    
})
export class AuthModule {}
