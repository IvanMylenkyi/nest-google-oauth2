import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { session } from 'passport';


@Module({
  imports: [
    AuthModule, 
    PassportModule.register({ session: true})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
