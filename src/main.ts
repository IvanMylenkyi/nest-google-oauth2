import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api') //use global prefix "api"
  //define the session
  app.use(session({
    secret: '9iu8y7g8oy6ihj90uy87g8yvubhnjoi9-',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
  }),
  );
  //use passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(9090);
}
bootstrap();
